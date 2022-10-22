namespace New.Models
{
    public class CharacterBag
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public int? ItemId { get; set; }

        public virtual Item Item { get; set; } = null!;
        public virtual Character Character { get; set; } = null!;
    }
}
