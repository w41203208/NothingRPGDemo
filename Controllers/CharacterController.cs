using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using New.Context;
using New.Struct;
using New.Models;
using New.Dto.Character;
using New.Dto.Common;
using New.Dto.Shop;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly MiniDBContext _context;

        public CharacterController(MiniDBContext context)
        {
            _context = context;
        }

        [HttpGet("characterEquipment")]
        [Produces("application/json")]
        public async Task<ActionResult<CharacterEquipmentsDto>> GetCharacterEquipment(int id)
        {
            var character_has_equipments = await _context.Characters
                .Where(c => c.Id == id)
                .Include(c => c.CharacterEquipments).ThenInclude(ce => ce.Item).ThenInclude(i => i.Attribute)
                .Include(c => c.CharacterEquipments).ThenInclude(ce => ce.Item).ThenInclude(i => i.ItemType)
                .Include(c => c.CharacterEquipments).ThenInclude(ce => ce.EquipmentSlot)
                .FirstOrDefaultAsync();
            if (character_has_equipments == null)
            {
                return NotFound();
            }
            var equipments = new CharacterEquipmentsDto
            {
                Name = character_has_equipments.Name,
                Equipments = character_has_equipments.CharacterEquipments.Select(ce => new EquipmentSlotDto
                {
                    SlotName = ce.EquipmentSlot.Name,
                    EquipmentItem = ce.Item != null ? new ItemDto
                    {
                        Id = ce.EquipmentSlotId,
                        Name = ce.Item.Name,
                        ItemType = ce.Item.ItemType.Type,
                        EquipmentType = ce.Item.EquipmentType,
                        Quality = ce.Item.Quality,
                        Attribute = ce.Item.Attribute.Name,
                        Value = ce.Item.Value,
                    } : null,
                }).ToList()
            };
            return equipments;
        }

        [HttpGet("characterBag")]
        [Produces("application/json")]
        public async Task<ActionResult<CharacterBagDto>> GetCharacterBag(int id)
        {
            var character_has_bag = await _context.Characters
                .Where(c => c.Id == id)
                .Include(c => c.CharacterBags).ThenInclude(cb => cb.Item).ThenInclude(i => i.Attribute)
                .Include(cb => cb.CharacterBags).ThenInclude(cb => cb.Item).ThenInclude(i => i.ItemType)
                .FirstOrDefaultAsync();
            if (character_has_bag == null)
            {
                return NotFound();
            }
            var bag = new CharacterBagDto
            {
                Name = character_has_bag.Name,
                Items = character_has_bag.CharacterBags.Select(cb => new ItemDto
                {
                    Id = cb.Id,
                    Name = cb.Item.Name,
                    ItemType = cb.Item.ItemType.Type,
                    EquipmentType = cb.Item.EquipmentType,
                    Quality = cb.Item.Quality,
                    Attribute = cb.Item.Attribute.Name,
                    Value = cb.Item.Value,
                    Money = cb.Item.Money,
                }).ToList()
            };

            return bag;
        }
        [HttpGet("characterAttribute")]
        [Produces("application/json")]
        public async Task<ActionResult<CharacterAttributeDto>> GetCharacterAttribute(int id)
        {
            var character_has_attribute = await _context.Characters
                .Where(c => c.Id == id)
                .Include(c => c.CharacterAttributes).ThenInclude(ca => ca.Attribute)
                .FirstOrDefaultAsync();
            if(character_has_attribute == null)
            {
                return NotFound();
            }
            var attributes = new CharacterAttributeDto
            {
                CharacterId = character_has_attribute.Id,
                CharaterName = character_has_attribute.Name,
                Attributes = character_has_attribute.CharacterAttributes.Select(ca => new AttributeDto
                {
                    Id = ca.Id,
                    Name = ca.Attribute.Name,
                    Value = ca.Value,
                }).ToList()
            };
            return attributes;
        }

        [HttpPost("mountedEquipment")]
        [Produces("application/json")]
        public async Task<ActionResult<ItemDto>> MountedEquipment(MountedEquipment mountedEquipment)
        {
            ItemDto equipment_item;
            ItemDto? unequipment_item;
            var bag_has_item = await _context.CharacterBag
                .Where(cb => cb.Id == mountedEquipment.CharacterBagId)
                .Include(cb => cb.Item).ThenInclude(i => i.Attribute)
                .Include(cb => cb.Item).ThenInclude(i => i.ItemType)
                .FirstOrDefaultAsync();
            if(bag_has_item == null)
            {
                return BadRequest(new
                {
                    msg = "This item not in your bag!",
                    mounted = false
                });
            }
            var character_equipment_check = await _context.CharacterEquipments
                .Where(ce => ce.CharacterId == mountedEquipment.CharacterId)
                .Where(ce => ce.EquipmentSlotId == mountedEquipment.SlotId)
                .Include(cb => cb.Item).ThenInclude(i => i.Attribute)
                .Include(cb => cb.Item).ThenInclude(i => i.ItemType)
                .Include(ce => ce.EquipmentSlot).FirstOrDefaultAsync();
            // 判斷裝備槽與要插入裝備槽內的物品類型是否符合
            if (bag_has_item.Item.EquipmentType!.ToLower() != character_equipment_check!.EquipmentSlot.Name!.ToLower())
            {
                return BadRequest(new
                {
                    msg = "This item cannot be equipped on this slot of equipment!",
                    mounted = false
                });
            }
            equipment_item = new ItemDto
            {
                Id = character_equipment_check.EquipmentSlotId,
                Name = bag_has_item.Item.Name,
                ItemType = bag_has_item.Item.ItemType.Type,
                EquipmentType = bag_has_item.Item.EquipmentType,
                Quality = bag_has_item.Item.Quality,
                Attribute = bag_has_item.Item.Attribute.Name,
                Value = bag_has_item.Item.Value,
            };
            // 判斷是否有這個裝備槽 如果沒有就新增(但理論上不會沒有)
            if (character_equipment_check == null)
            {
                _context.CharacterEquipments.Add(new CharacterEquipment
                {
                    EquipmentSlotId = mountedEquipment.SlotId,
                    CharacterId = mountedEquipment.CharacterId,
                    ItemId = bag_has_item.Item.Id,
                });
                await _context.SaveChangesAsync();
                return Ok();
            }
            // 判斷裝備槽內有沒有裝備，有就交換，沒有就裝備上去
            if (character_equipment_check.Item == null)
            {
                unequipment_item = null;
                character_equipment_check.Item = bag_has_item.Item!;
                bag_has_item.ItemId = null;
            }
            else
            {
                unequipment_item = new ItemDto
                {
                    Id = bag_has_item.Id,
                    Name = character_equipment_check.Item.Name,
                    ItemType = character_equipment_check.Item.ItemType.Type,
                    EquipmentType = character_equipment_check.Item.EquipmentType,
                    Quality = character_equipment_check.Item.Quality,
                    Attribute = character_equipment_check.Item.Attribute.Name,
                    Value = character_equipment_check.Item.Value,
                };
                var temp_item = character_equipment_check.Item;
                character_equipment_check.Item = bag_has_item.Item!;
                bag_has_item.ItemId = temp_item.Id;
            }
            await _context.SaveChangesAsync();


            return Ok(new
            {
                equipmentItem = equipment_item,
                unequipmentItem = unequipment_item,
                mounted = true
            });
        }

        [HttpPost("unMountedEquipment")]
        [Produces("application/json")]
        public async Task<ActionResult<ItemDto>> UnMountedEquipment(UnMountedEquipment unMountedEquipment)
        {
            var character_equipment_check = await _context.CharacterEquipments
                .Where(ce => ce.CharacterId == unMountedEquipment.CharacterId)
                .Where(ce => ce.EquipmentSlotId == unMountedEquipment.SlotId)
                .Include(ce => ce.Item).ThenInclude(i => i.Attribute)
                .Include(ce => ce.Item).ThenInclude(i => i.ItemType)
                .Include(ce => ce.EquipmentSlot).FirstOrDefaultAsync();

            var item_id = character_equipment_check!.Item.Id;
            if (character_equipment_check == null)
            {
                return NotFound();
            }
            if (character_equipment_check.Item == null)
            {
                return NotFound();
            }
            character_equipment_check.ItemId = null;
            var bag_space = await _context.CharacterBag.Where(cb => cb.CharacterId == unMountedEquipment.CharacterId).Where(cb => cb.ItemId == null).FirstOrDefaultAsync();
            if (bag_space == null)
            {
                return BadRequest(new
                {
                    msg = "Your bag is full! Please clean your bag.",
                    buy = false
                });
            }
            bag_space.ItemId = character_equipment_check.Item.Id;
            await _context.SaveChangesAsync();



            var item = await _context.CharacterBag
                .Where(cb => cb.CharacterId == unMountedEquipment.CharacterId)
                .Where(cb => cb.ItemId == item_id)
                .Include(cb => cb.Item).ThenInclude(i => i.Attribute)
                .Include(cb => cb.Item).ThenInclude(i => i.ItemType)
                .OrderBy(cb => cb.Id)
                .Select(cb => new ItemDto
                {
                    Id = cb.Id,
                    Name = cb.Item.Name,
                    ItemType = cb.Item.ItemType.Type,
                    EquipmentType = cb.Item.EquipmentType,
                    Quality = cb.Item.Quality,
                    Attribute = cb.Item.Attribute.Name,
                    Value = cb.Item.Value,
                    Money = cb.Item.Money,
                })
                .LastOrDefaultAsync();

            return Ok(new
            {
                unequipmentItem = item,
                unmounted = true
            });
        }

        [HttpPost("buyItem")]
        [Produces("application/json")]
        public async Task<ActionResult<ItemDto>> BuyItemInShop(BuyItemDto buyItemDto)
        {
            var has_item = await _context.Items.Where(i => i.Id == buyItemDto.ItemId).FirstOrDefaultAsync(); ;
            if(has_item == null)
            {
                return BadRequest(new
                {
                    msg = "This item is not exist!",
                    buy = false
                });
            }
            var has_character = await _context.Characters.FirstOrDefaultAsync(c => c.Id == buyItemDto.CharacterId);
            if (has_character == null)
            {
                return BadRequest(new
                {
                    msg = "This character is not exsit!",
                    buy = false
                });
            };
            if (has_character.Money < has_item.Money)
            {
                return BadRequest(new
                {
                    msg = "Your money is not enough!",
                    buy = false
                });
            }
            int cost = has_item.Money;
            has_character.Money = has_character.Money - cost;
            var bag_space = await _context.CharacterBag.Where(cb => cb.CharacterId == has_character.Id).Where(cb => cb.ItemId == null).FirstOrDefaultAsync();
            if(bag_space == null)
            {
                return BadRequest(new
                {
                    msg = "Your bag is full! Please clean your bag.",
                    buy = false
                });
            }
            bag_space.ItemId = has_item.Id;
            await _context.SaveChangesAsync();

            var bag_has_item = await _context.CharacterBag
                .Where(cb => cb.Id == bag_space.Id)
                .Include(cb => cb.Item).ThenInclude(i => i.Attribute)
                .Include(cb => cb.Item).ThenInclude(i => i.ItemType)
                .FirstOrDefaultAsync();

            var item = new ItemDto
            {
                Id = bag_has_item!.Id,
                Name = bag_has_item.Item.Name,
                ItemType = bag_has_item.Item.ItemType.Type,
                EquipmentType = bag_has_item.Item.EquipmentType,
                Quality = bag_has_item.Item.Quality,
                Attribute = bag_has_item.Item.Attribute.Name,
                Value = bag_has_item.Item.Value,
                Money = bag_has_item.Item.Money,
            };

            return Ok(new
            {
                item = item,
                buy = true
            });
        }

        

        // PUT api/<CharacterController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CharacterController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
