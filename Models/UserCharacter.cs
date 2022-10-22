namespace New.Models
{
    public partial class UserCharacter
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CharacterId { get; set; }
        public virtual Character Character { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
