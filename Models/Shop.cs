namespace New.Models
{
    public class Shop
    {
        public Shop()
        {
            Items = new HashSet<Item>();
        }
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public virtual ICollection<Item>? Items { get; set; }
    }
}
