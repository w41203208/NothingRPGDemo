using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace New.Models
{
    public partial class Character
    {
        public Character()
        {
            CharacterEquipments = new HashSet<CharacterEquipment>();
            UserCharacters = new HashSet<UserCharacter>();
            CharacterAttributes = new HashSet<CharacterAttribute>();
            CharacterBags = new HashSet<CharacterBag>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Level { get; set; }
        public int Xp { get; set; }
        public int Money { get; set; }

        public virtual ICollection<CharacterEquipment> CharacterEquipments { get; set; }
        public virtual ICollection<UserCharacter> UserCharacters { get; set; }
        public virtual ICollection<CharacterAttribute> CharacterAttributes { get; set; }
        public virtual ICollection<CharacterBag> CharacterBags { get; set; }
    }
}
