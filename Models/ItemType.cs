using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace New.Models
{
    public partial class ItemType
    {
        public ItemType()
        {
            Items = new HashSet<Item>();
        }

        public int Id { get; set; }
        public string? Type { get; set; }
        public string? Description { get; set; }

        public virtual ICollection<Item> Items { get; set; }
    }
}
