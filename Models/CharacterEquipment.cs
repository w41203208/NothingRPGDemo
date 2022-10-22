using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace New.Models
{
    public partial class CharacterEquipment
    {
        public int Id { get; set; }
        public int EquipmentSlotId { get; set; }
        public int CharacterId { get; set; }
        public int? ItemId { get; set; }

        public virtual Character Character { get; set; } = null!;
        public virtual EquipmentSlot EquipmentSlot { get; set; } = null!;
        public virtual Item Item { get; set; } = null!;
    }
}
