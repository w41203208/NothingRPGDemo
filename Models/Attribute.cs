using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace New.Models
{
    public partial class Attribute
    {
        public Attribute()
        {
            Items = new HashSet<Item>();
            CharacterAttributes = new HashSet<CharacterAttribute>();
        }
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Item> Items { get; set; }

        public virtual ICollection<CharacterAttribute> CharacterAttributes { get; set; }
    }
}
