

namespace New.Struct
{
    public class BaseItem
    {
        //private IAction? _action;
        public BaseItem(string name, string itemType, string quality, int value, string attribute)
        {
            Name = name;
            Type = itemType;
            Quality = quality;
            Value = value;
            Attribute = attribute;
        }
        public string? Name { get; set; }
        public string? Attribute { get; set; }
        public string? Type { get; set; }
        public string? Quality { get; set; } //由普通屬性數值高低決定 1-5 rare、5-10 Legendary, damage 10-30 rare、30~50 Legendary
        public int? Value { get; set; } // 1-10、10-50

        //public void SetAction(IAction action)
        //{
        //    _action = action;
        //}
        
    }

    //public interface IAction
    //{
    //    public void Action(int value);
    //}
    //public class Def: IAction
    //{
    //    public void Action(int value)
    //    {
            
    //    }
    //}
    //public class Attack : IAction
    //{
    //    public void Action(int value)
    //    {

    //    }
    //}
    public class EquipmentItem : BaseItem
    {
        public string? EquipmentType;
        public EquipmentItem(string name, string itemType, string equipmentType, string quality, int value, string attr): base(name, itemType, quality, value, attr)
        {
            EquipmentType = equipmentType;
        }
    } 
    public class Sword : EquipmentItem
    {
        public Sword(string name, string itemType, string equipmentType, string quality, int value, string attr) : base(name, itemType, equipmentType, quality, value, attr)
        {
        }
        public string PrintSwordName()
        {
            return "Type：sword, Name：" + Name;
        }
    }
    public class Axe : EquipmentItem
    {
        public Axe(string name, string itemType, string equipmentType, string quality, int value, string attr) : base(name, itemType, equipmentType, quality, value, attr)
        {
        }
        public string PrintAxeName()
        {
            return "Type：Axe, Name：" + Name;
        }
    }
}



