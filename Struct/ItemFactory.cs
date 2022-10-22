namespace New.Struct
{
    public interface ItemValueCalculator
    {
        public int CalculateItemValue();
        public string CalculateItemQuality(int v);
    }
    public class WearItemCalculator : ItemValueCalculator
    {
        public int CalculateItemValue()
        {
            int value;
            Random crandom = new Random();
            int x = crandom.Next(1, 1001);
            if (x >= 850)
            {
                value = crandom.Next(7, 11);
            }else if(x >= 700 && x < 850)
            {
                value = crandom.Next(4, 7);
            }
            else
            {
                value = crandom.Next(1, 4);
            }
            return value;
        }
        public string CalculateItemQuality(int v)
        {
            string quality;
            if (v >= 9)
            {
                quality = "Legendary";
            }
            else if (v >= 7)
            {
                quality = "Epic";
            }
            else if (v >= 5)
            {
                quality = "Rare";
            }
            else if (v >= 3)
            {
                quality = "Uncommon";
            }
            else
            {
                quality = "Common";
            }
            return quality;
        }
    }
    public class WeaponCalculator : ItemValueCalculator
    {
        public int CalculateItemValue()
        {
            int value;
            Random crandom = new Random();
            int x = crandom.Next(1, 1001);
            if (x >= 850)
            {
                value = crandom.Next(40, 51);
            }
            else if (x >= 700 && x < 850)
            {
                value = crandom.Next(26, 40);
            }
            else
            {
                value = crandom.Next(10, 26);
            }
            return value;
        }
        public string CalculateItemQuality(int v)
        {
            string quality;
            if (v >= 45)
            {
                quality = "Legendary";
            }
            else if (v >= 38)
            {
                quality = "Epic";
            }
            else if (v >= 25)
            {
                quality = "Rare";
            }
            else if (v >= 15)
            {
                quality = "Uncommon";
            }
            else
            {
                quality = "Common";
            }
            return quality;
        }
    }
    public abstract class AItemFactory
    {
        protected string _type;
        protected ItemValueCalculator _calculator;
        public AItemFactory(string type, ItemValueCalculator calculator)
        {
            _type = type;
            _calculator = calculator;
        }
    }
    public abstract class EquipmentItemFactory : AItemFactory
    {
        public EquipmentItemFactory(string type, ItemValueCalculator calculator) : base(type, calculator) { }
        public abstract EquipmentItem CreateItem(string name);
    }

    public class SwordFactory : EquipmentItemFactory
    {
        public static SwordFactory Instance
        {
            get
            {
                return InnerClass.instance;
            }
        }
        class InnerClass
        {
            internal static readonly SwordFactory instance = new SwordFactory("sword", new WeaponCalculator());
        }
        public SwordFactory(string type, ItemValueCalculator calculator) : base(type, calculator)
        {
        }
        override public EquipmentItem CreateItem(string name)
        {
            int value = _calculator.CalculateItemValue();
            string quality = _calculator.CalculateItemQuality(value);
            return new Sword(name, _type, "main_hand", quality, value, "attack");
        }
    }
    public class AxeFactory : EquipmentItemFactory
    {
        public static AxeFactory Instance
        {
            get
            {
                return InnerClass.instance;
            }
        }
        class InnerClass
        {
            internal static readonly AxeFactory instance = new AxeFactory("axe", new WeaponCalculator());
        }

        public AxeFactory(string type, ItemValueCalculator calculator) : base(type, calculator)
        {
        }
        override public EquipmentItem CreateItem(string name)
        {
            int value = _calculator.CalculateItemValue();
            string quality = _calculator.CalculateItemQuality(value);
            return new Axe(name, _type, "main_hand", quality, value, "attack");
        }
    }

}
