using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace New.Models
{
    public partial class EquipmentSlot
    {
        public EquipmentSlot()
        {
            CharacterEquipments = new HashSet<CharacterEquipment>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<CharacterEquipment> CharacterEquipments { get; set; }
    }
}
