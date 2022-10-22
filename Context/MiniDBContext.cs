using Microsoft.EntityFrameworkCore;
using New.Models;

namespace New.Context
{
    public partial class MiniDBContext : DbContext
    {
        public MiniDBContext()
        {
        }

        public MiniDBContext(DbContextOptions<MiniDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Models.Attribute> Attributes { get; set; } = null!;
        public virtual DbSet<Character> Characters { get; set; } = null!;
        public virtual DbSet<CharacterEquipment> CharacterEquipments { get; set; } = null!;
        public virtual DbSet<EquipmentSlot> EquipmentSlots { get; set; } = null!;
        public virtual DbSet<Item> Items { get; set; } = null!;
        public virtual DbSet<ItemType> ItemTypes { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserCharacter> UserCharacters { get; set; } = null!;
        public virtual DbSet<CharacterAttribute> CharacterAttribute { get; set; } = null!;
        public virtual DbSet<CharacterBag> CharacterBag { get; set; } = null!;

        public virtual DbSet<Shop> Shop { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=ConnectionStrings:MiniProjectDBConnection");
                optionsBuilder.EnableSensitiveDataLogging();
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Attribute>(entity =>
            {
                entity.ToTable("attribtute");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });
            #region AttributeSeed
            modelBuilder.Entity<Models.Attribute>().HasData(
                new { Id = 1, Name = "HP", Description = "HP" },
                new { Id = 2, Name = "MP", Description = "MP" },
                new { Id = 3, Name = "Intelligence", Description = "Intelligence" },
                new { Id = 4, Name = "Strength", Description = "Strength" },
                new { Id = 5, Name = "Luck", Description = "Luck" },
                new { Id = 6, Name = "Dexterity", Description = "Dexterity" },
                new { Id = 7, Name = "Attack", Description = "Attack" },
                new { Id = 8, Name = "Mattack", Description = "Mattack" }
            );
            #endregion
            modelBuilder.Entity<Shop>(entity =>
            {
                entity.ToTable("shop");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name).HasColumnName("name");
            });
            #region ShopSeed
            modelBuilder.Entity<Models.Shop>().HasData(
                new { Id = 1, Name = "武器店" },
                new { Id = 2, Name = "道具店" },
                new { Id = 3, Name = "防具店" }
            );
            #endregion
            modelBuilder.Entity<Character>(entity =>
            {
                entity.ToTable("character");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Level).HasColumnName("level");

                entity.Property(e => e.Money).HasColumnName("money");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Xp).HasColumnName("xp");
            });

            modelBuilder.Entity<CharacterEquipment>(entity =>
            {
                entity.ToTable("character_equipment");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CharacterId).HasColumnName("character_id");

                entity.Property(e => e.EquipmentSlotId).HasColumnName("equipment_slot_id");

                entity.Property(e => e.ItemId).HasColumnName("item_id");

                entity.HasOne(d => d.Character)
                    .WithMany(p => p.CharacterEquipments)
                    .HasForeignKey(d => d.CharacterId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_character_equipment_character_id");

                entity.HasOne(d => d.EquipmentSlot)
                    .WithMany(p => p.CharacterEquipments)
                    .HasForeignKey(d => d.EquipmentSlotId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_character_equipment_equipment_slot_id");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.CharacterEquipments)
                    .HasForeignKey(d => d.ItemId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_character_equipment_item_id");
            });

            modelBuilder.Entity<EquipmentSlot>(entity =>
            {
                entity.ToTable("equipment_slot");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .HasMaxLength(20)
                    .HasColumnName("name");
            });
            #region EquipmentSlotSeed
            modelBuilder.Entity<Models.EquipmentSlot>().HasData(
                new { Id = 1, Name = "head" },
                new { Id = 2, Name = "body" },
                new { Id = 3, Name = "hands" },
                new { Id = 4, Name = "main_hand" },
                new { Id = 5, Name = "off_hand" },
                new { Id = 6, Name = "lower_body" },
                new { Id = 7, Name = "foots" }
            );
            #endregion
            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable("item");

                entity.HasIndex(e => e.Id, "IX_item");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AttributeId).HasColumnName("attribute_id");

                entity.Property(e => e.ItemTypeId).HasColumnName("item_type_id");

                entity.Property(e => e.Money).HasColumnName("money");

                entity.Property(e => e.ShopId).HasColumnName("shop_id").IsRequired(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Quality)
                    .HasMaxLength(10)
                    .HasColumnName("quality");

                entity.Property(e => e.Value).HasColumnName("value");

                entity.HasOne(d => d.Attribute)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.AttributeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_item_attribute_id");

                entity.HasOne(d => d.ItemType)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.ItemTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_item_item_type_id");

                entity.HasOne(d => d.Shop)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.ShopId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_item_shop_id");
            });

            modelBuilder.Entity<ItemType>(entity =>
            {
                entity.ToTable("item_type");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Description)
                    .HasMaxLength(200)
                    .HasColumnName("description");

                entity.Property(e => e.Type)
                    .HasMaxLength(20)
                    .HasColumnName("type");
            });
            #region ItemTypeSeed
            modelBuilder.Entity<Models.ItemType>().HasData(
                new { Id = 1, Type = "sword", Description = "sword" },
                new { Id = 2, Type = "axe", Description = "axe" },
                new { Id = 3, Type = "leather", Description = "leather" },
                new { Id = 4, Type = "armor", Description = "armor" },
                new { Id = 5, Type = "helmet", Description = "helmet" },
                new { Id = 6, Type = "shoes", Description = "shoes" }
            );
            #endregion
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(20)
                    .HasColumnName("password");
            });

            modelBuilder.Entity<UserCharacter>(entity =>
            {
                entity.ToTable("user_character");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CharacterId).HasColumnName("character_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Character)
                    .WithMany(p => p.UserCharacters)
                    .HasForeignKey(d => d.CharacterId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("character_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserCharacters)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("user_id");
            });
            modelBuilder.Entity<CharacterBag>(entity =>
            {
                entity.ToTable("character_bag");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CharacterId).HasColumnName("character_id");

                entity.Property(e => e.ItemId).HasColumnName("item_id").IsRequired(false);

                entity.HasOne(d => d.Character)
                    .WithMany(p => p.CharacterBags)
                    .HasForeignKey(d => d.CharacterId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_character_bag_character_id");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.CharacterBags)
                    .HasForeignKey(d => d.ItemId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK_character_bag_item_id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
