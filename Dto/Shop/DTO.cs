namespace New.Dto.Shop
{
    public class DTO
    {

    }
    //public class ShopDto
    //{
    //    public string? Name { get; set; }
    //    public ICollection<ItemDto>? Items { get; set; }
    //}
    public class ShopItemDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Quality { get; set; }
        public int? Value { get; set; }
        public string? Attribute { get; set; }
        public string? ItemType { get; set; }
        public string? EquipmentType { get; set; }
        public int Money { get; set; }
    }
    public class AddItem
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
    }
}
