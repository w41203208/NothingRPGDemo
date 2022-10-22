using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace New.Models
{
    public partial class User
    {
        public User()
        {
            UserCharacters = new HashSet<UserCharacter>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string? Password { get; set; }

        public virtual ICollection<UserCharacter>? UserCharacters { get; set; }
    }
}
