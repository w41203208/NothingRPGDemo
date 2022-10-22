namespace New.Models
{
    public partial class CharacterAttribute
    {
        public int Id { get; set; }
        public int CharacterId { get; set; }
        public int AttributeId { get; set; }
        public int Value { get; set; }

        public virtual Attribute Attribute { get; set; } = null!;
        public virtual Character Character { get; set; } = null!;
    }
}
