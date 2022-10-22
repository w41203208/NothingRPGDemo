using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using New.Context;
using New.Models;
using New.Dto.Shop;
using New.Struct;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly MiniDBContext _context;

        public ShopController(MiniDBContext context)
        {
            _context = context;
        }
        // GET: api/<ShopController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShopItemDTO>>> GetAllShopItem()
        {
            var itemList = await _context.Items.Include(i => i.Attribute).Include(i => i.ItemType).Select(i => new ShopItemDTO
            {
                Id = i.Id,
                Name = i.Name,
                Quality = i.Quality,
                Value = i.Value,
                Attribute = i.Attribute.Name,
                ItemType = i.ItemType.Type,
                EquipmentType = i.EquipmentType,
                Money = i.Money,
            }).ToListAsync();

            return itemList;
        }

        // GET api/<EquipmentController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EquipmentController>
        [HttpPost("addEquipment")]
        [Produces("application/json")]
        public async Task<ActionResult> AddEquipment(AddItem addItem)
        {
            var has_item = await _context.Items.FirstOrDefaultAsync(item => item.Name == addItem.Name);
            if(has_item != null)
            {
                return BadRequest(new
                {
                    msg = "Item has already exist!"
                });
            }
            EquipmentItemFactory factory;
            if (addItem.Type == "sword")
            {
                factory = SwordFactory.Instance;
            } else //if (addItem.ItemType == "axe")
            {
                factory = AxeFactory.Instance;
            } 
            //else if(addItem.ItemType == "armor")
            //{
                
            //} else if(addItem.ItemType == "helmet")
            //{
                
            //} else if(addItem.ItemType == "leather")
            //{

            //}
            EquipmentItem item = factory.CreateItem(addItem.Name!);
            var attribute = await _context.Attributes.FirstOrDefaultAsync(a => a.Name == item.Attribute);
            var itemType = await _context.ItemTypes.FirstOrDefaultAsync(it => it.Type == item.Type);
            _context.Items.Add(new Item
            {
                Name = item.Name,
                Quality = item.Quality,
                Value = item.Value,
                ItemTypeId = itemType!.Id,
                EquipmentType = item.EquipmentType,
                AttributeId = attribute!.Id,
            });
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        // PUT api/<EquipmentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EquipmentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
