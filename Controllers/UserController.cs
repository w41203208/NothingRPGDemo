using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using New.Context;
using New.Models;
using New.Dto.Common;
using New.Services;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860



namespace New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MiniDBContext _context;
        private readonly ITestDependencyInjection _tdi;

        public UserController(MiniDBContext context, ITestDependencyInjection tdi)
        {
            _context = context;
            _tdi = tdi;
        }
        // GET: api/<UserController>
        // 使用join來達到三張表的Sql
        // The table use join to query anther table that must not fk.
        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllUsersWithCharacters()
        {
            List<User> users = await _context.Users.ToListAsync();
            List<UserCharacter> user_characters = await _context.UserCharacters.ToListAsync();
            List<Character> characters = await _context.Characters.ToListAsync();
            _tdi.WriteMessage("testtestset");
            var x = users
                .Join(user_characters, u => u.Id, uc => uc.UserId, (u, uc) => new { u, uc })
                .Join(characters, uuc => uuc.uc.CharacterId, c => c.Id, (uuc, c) => new { uuc, c })
                .Select(m => new
                {
                    m.uuc.u.Id,
                    m.uuc.u.Email,
                    m.uuc.u.Password,
                    Ch = m.c
                });
            Dictionary<string, UserDTO> dic_userDTOs = new Dictionary<string, UserDTO>();

            foreach (var i in x)
            {
                if (!dic_userDTOs.ContainsKey(i.Id.ToString()))
                {
                    dic_userDTOs[i.Id.ToString()] = new UserDTO { 
                        Id = i.Id,
                        Email = i.Email,
                        Password = i.Password,
                        Characters = new List<CharacterDTO>()
                    };
                    dic_userDTOs[i.Id.ToString()].Characters?.Add(
                        new CharacterDTO
                        {
                            Id = i.Ch.Id,
                            Name = i.Ch.Name,
                            Level = i.Ch.Level,
                            Xp = i.Ch.Xp,
                            Money = i.Ch.Money,
                        }
                    );
                }
                else
                {
                    dic_userDTOs[i.Id.ToString()].Characters?.Add(
                        new CharacterDTO
                        {
                            Id = i.Ch.Id,
                            Name = i.Ch.Name,
                            Level = i.Ch.Level,
                            Xp = i.Ch.Xp,
                            Money = i.Ch.Money,
                        }
                    );
                }
            }

            List<UserDTO> usersDTO = new List<UserDTO>();

            foreach(KeyValuePair<string, UserDTO> userDTO in dic_userDTOs)
            {
                usersDTO.Add(userDTO.Value);
            }

            return usersDTO;
        }

        //使用 /{id}
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.SingleAsync(user=>user.Id == id);

            if (user == null) 
            {
                return NotFound(user);
            }

            return user;
        }

        // 使用 Params
        // 使用include來達到三張表的sql
        // The table use include to query anther table that must have fk to relation anther table.
        [HttpPost("login")]
        [Produces("application/json")]
        public async Task<ActionResult<LoginUserDTO>> Login(User user)
        {
            if(user.Email == "" || user.Password == "")
            {
                return NotFound(new { text = "Please enter your email and password!" });
            }
            List<Character> characters = await _context.Characters.ToListAsync();
            var has_user = await _context.Users
                .Where(u => u.Email == user.Email)
                .Where(u => u.Password == user.Password)
                .Include(u => u.UserCharacters)!
                .ThenInclude(uc => uc.Character).FirstOrDefaultAsync();

            if (has_user == null)
            {
                return NotFound(new { text = "Your email or password is error." });
            }
            

            LoginUserDTO userDto = new LoginUserDTO
            {
                Id = has_user.Id,
                Email = has_user.Email,
                //Characters = has_user.UserCharacters?.Select(uc => new CharacterDTO
                //{
                //    Id = uc.Character.Id,
                //    Name = uc.Character.Name,
                //    Level = uc.Character.Level,
                //    Xp = uc.Character.Xp,
                //    Money = uc.Character.Money,
                //}).ToList(),
            };
            return userDto;
        }

        //使用 Body raw/json
        [HttpPost("register")]
        [Produces("application/json")]
        public async Task<ActionResult> Register(User user)
        {
            User? has_user = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if(has_user == null)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }
            else
            {
                return BadRequest(new { text = "This user number is already exist!" });
            }
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        
        }
        // api/[controller]?id=1
        [HttpGet("userHasCharacters")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<CharacterDTO>>> GetUserHasCharacters(int id)
        {
            var userCharacters = await _context.UserCharacters.Where(uc => uc.UserId == id).Include(uc => uc.Character).ToListAsync();

            var characters = userCharacters.Select(uc => new CharacterDTO
            {
                Id = uc.Character.Id,
                Name = uc.Character.Name,
                Level = uc.Character.Level,
                Xp = uc.Character.Xp,
                Money = uc.Character.Money,
            }).ToList();

            return characters;
        }

        [HttpPost("addCharacter")]
        [Produces("application/json")]
        public async Task<ActionResult> AddCharacter(AddCharacter addCharacter) //這裡應該要改成從Struct裡的Character new出物件之後再丟進資料庫
        {
            if (addCharacter.Name == null)
            {
                return BadRequest(new
                {
                    Msg = "You don't name your character."
                });
            }
            else
            {
                var has_characters = await _context.Characters
                    .FirstOrDefaultAsync(c => c.Name == addCharacter.Name);
                if (has_characters == null)
                {
                    // 之後改成由server產生id添加進database
                    _context.Characters.Add(new Character
                    {
                        Name = addCharacter.Name,
                        Level = 1,
                        Xp = 0,
                        Money = 100000,
                    });
                    await _context.SaveChangesAsync();
                    // add 到第三張關聯表 user_character
                    Character new_character = await _context.Characters.FirstAsync(c => c.Name == addCharacter.Name);
                    _context.UserCharacters.Add(new UserCharacter
                    {
                        UserId = addCharacter.UserId,
                        CharacterId = new_character.Id,
                    });
                    var attrs = await _context.Attributes.Select(a => a.Id).ToListAsync();
                    foreach (var a in attrs)
                    {
                        _context.CharacterAttribute.Add(new CharacterAttribute
                        {
                            CharacterId = new_character.Id,
                            AttributeId = a,
                            Value = 1,
                        });
                    }
                    var slots = await _context.EquipmentSlots.Select(es => es.Id).ToListAsync();
                    foreach (var s in slots)
                    {
                        _context.CharacterEquipments.Add(new CharacterEquipment
                        {
                            CharacterId = new_character.Id,
                            EquipmentSlotId = s,
                            ItemId = null,
                        });
                    }
                    var BAGMAX = 50;
                    for (var i = 0; i < BAGMAX; i++)
                    {
                        _context.CharacterBag.Add(new CharacterBag
                        {
                            CharacterId = new_character.Id,
                            ItemId = null,
                        });
                    }
                    await _context.SaveChangesAsync();
                }
                else
                {
                    return BadRequest(new
                    {
                        Msg = "This name has been named by other users."
                    });
                }
            }
            var output_character = _context.UserCharacters
                .Where(uc => uc.UserId == addCharacter.UserId)
                .Include(uc => uc.Character)
                .OrderBy(uc => uc.CharacterId)
                .Select(uc => new CharacterDTO
                {
                    Id = uc.Character.Id,
                    Name = uc.Character.Name,
                    Level = uc.Character.Level,
                    Xp = uc.Character.Xp,
                    Money = uc.Character.Money,
                }).LastOrDefaultAsync();

            return Ok(output_character);
        }

        [HttpPost("deleteCharacter")]
        [Produces("application/json")]
        public async Task<ActionResult> DeleteUserHasCharacter(DeleteCharacter deleteCharacter)
        {

            if (deleteCharacter.Id == null)
            {
                return NotFound(new
                {
                    Msg = "Please input id to delete Character."
                });
            }
            Character? deleteUserCharacter = null;
            deleteUserCharacter = await _context.Characters.FirstOrDefaultAsync(c => c.Id == deleteCharacter.Id);
            if (deleteUserCharacter != null)
            {
                _context.Characters.Remove(deleteUserCharacter);
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound(new { Msg = "Cannot find this character." });
            }
            return Ok(new
            {
                Msg = "Delete success."
            });
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}


