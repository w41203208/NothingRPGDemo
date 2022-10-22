namespace New.Dto.Common
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public ICollection<CharacterDTO>? Characters { get; set; }
    }
    public class LoginUserDTO
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        //public ICollection<CharacterDTO>? Characters { get; set; }
    }

    public class DeleteCharacter
    {
        public int? Id { get; set; }
    }

    public class AddCharacter
    {
        public string? Name { get; set; }
        public int UserId { get; set; }
    }
    public class CharacterDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? Level { get; set; }
        public int? Xp { get; set; }
        public int? Money { get; set; }
    }
    
    public class ItemDto
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
}
