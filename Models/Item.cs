using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace New.Models
{
    public partial class Item
    {
        public Item()
        {
            CharacterEquipments = new HashSet<CharacterEquipment>();
            CharacterBags = new HashSet<CharacterBag>();
        }
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Quality { get; set; }
        public int? Value { get; set; }
        public string? EquipmentType { get; set; }
        public int ItemTypeId { get; set; }
        public int AttributeId { get; set; }
        public int? ShopId  { get; set; }
        public int Money { get; set; }

        public virtual Shop Shop { get; set; } = null!;
        public virtual Attribute Attribute { get; set; } = null!;
        public virtual ItemType ItemType { get; set; } = null!;
        public virtual ICollection<CharacterEquipment> CharacterEquipments { get; set; }
        public virtual ICollection<CharacterBag> CharacterBags { get; set; }
    }
}
