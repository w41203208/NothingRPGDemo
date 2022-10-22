using New.Dto.Common;

namespace New.Dto.Character
{
    public class CharacterControllerDTO
    {
    }
    public class AttributeDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int Value { get; set; }
    }
    public class MountedEquipment
    {
        public int CharacterId { get; set; }
        public int CharacterBagId { get; set; }
        public int SlotId { get; set; }
    }
    public class UnMountedEquipment
    {
        public int CharacterId { get; set; }
        public int SlotId { get; set; }
    }
    public class CharacterBagDto
    {
        public string? Name { get; set; }
        public ICollection<ItemDto>? Items { get; set; }
    }
    public class CharacterAttributeDto
    {
        public int? CharacterId { get; set; }
        public string? CharaterName { get; set; }
        public ICollection<AttributeDto>? Attributes { get; set; }
    }
    public class CharacterEquipmentsDto
    {
        public string? Name { get; set; }
        public ICollection<EquipmentSlotDto>? Equipments { get; set; }
    }

    public class EquipmentSlotDto
    {
        public string? SlotName { get; set; }
        public ItemDto? EquipmentItem { get; set; }
    }


    public class BuyItemDto
    {
        public int CharacterId { get; set; }
        public int ItemId { get; set; }
    }
}
