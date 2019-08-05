using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace MISA.DemoShop.Models
{
    public class ItemDetails
    {
        static List<ItemDetails> _ListItemdetails = new List<ItemDetails>()
        {
              new ItemDetails{ RefID = "123a-4561",SKUCode="ASMHN01-VA-L",InventoryItemName="Áo sơ mi hoa nhí (Vàng/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=1,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4561",SKUCode="ASMHN01-XL",InventoryItemName="Áo sơ mi đen (Vàng/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4561",SKUCode="ASMHN01-SA-F",InventoryItemName="Áo sơ mi siêu nhân (đỏ/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4561",SKUCode="ASMHN01-AA-A",InventoryItemName="Áo sơ mi đen (Vàng/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4561",SKUCode="ASMHN01-VD-F",InventoryItemName="Áo sơ mi hoa cúc (Vàng/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-4562",SKUCode="BASZN01-XL",InventoryItemName="Áo đen (Đen/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4562",SKUCode="BASZN01-XL",InventoryItemName="Quần joger (Đen/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4562",SKUCode="BASZN01-XL",InventoryItemName="Quần BS (Đen/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4562",SKUCode="BASZN01-XL",InventoryItemName="Quần bò hoa nhí (Đen/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4562",SKUCode="BASZN01-XL",InventoryItemName="Quần bò hoa nhí (Đen/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4562",SKUCode="BASZN01-XL",InventoryItemName="Quần bò hoa nhí (Đen/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-4563",SKUCode="BASZN02-XL",InventoryItemName="Áo phông trơn ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4563",SKUCode="BA3212-FL",InventoryItemName="Áo phông tím ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4563",SKUCode="BAS02-XZX",InventoryItemName="Áo phông sticky ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4563",SKUCode="BASDA45-XL",InventoryItemName="Áo phông thường ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4563",SKUCode="BASFS54-XL",InventoryItemName="Áo phông basic ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4563",SKUCode="BASFS2132-XL",InventoryItemName="Áo phông  ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=60},
              new ItemDetails{ RefID = "123a-4563",SKUCode="BASZN422-XL",InventoryItemName="Áo phông  ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4563",SKUCode="BASGG023-XL",InventoryItemName="Áo phông  ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4563",SKUCode="BASZN02-XL",InventoryItemName="Áo phông  ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-4564",SKUCode="BASZN03-XL",InventoryItemName="Áo Ba cộc tay",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4564",SKUCode="BASZN03-XL",InventoryItemName="Áo Ba Lỗ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4564",SKUCode="BASZN03-XL",InventoryItemName="Áo",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4564",SKUCode="BASZN03-XL",InventoryItemName="Áo Ba Lỗ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4564",SKUCode="BASZN03-XL",InventoryItemName="Áo croptop",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4564",SKUCode="BASZN03-XL",InventoryItemName="Áo Ba Lỗ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4564",SKUCode="BASZN03-XL",InventoryItemName="Áo dài tay",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4564",SKUCode="BASZN03-XL",InventoryItemName="Áo Ba Lỗ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-4565",SKUCode="ASMHN02-VA-L",InventoryItemName="Mũ lưỡi trai ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4565",SKUCode="ASMHN02-VA-L",InventoryItemName="Quần đi biển ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4565",SKUCode="ASMHN02-VA-L",InventoryItemName="Quần đùi hoa nhí ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-4566",SKUCode="ASMHN01-VA-L",InventoryItemName="Quần Dài ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4566",SKUCode="ASMHN01-VA-L",InventoryItemName="Quần Bò",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-4566",SKUCode="ASMHN01-VA-L",InventoryItemName="Quần ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-4567",SKUCode="ASMHN04-VA-L",InventoryItemName="Áo sơ mi hoa nhí (Vàng/L)",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-4568",SKUCode="ASMHN06-VA-L",InventoryItemName="Áo sơ mi ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-4569",SKUCode="ACSN01-L",InventoryItemName="Áo sơ mi ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-45610",SKUCode="ACSN02-L",InventoryItemName="Áo sơ mi hoa ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-45611",SKUCode="ACSN04-L",InventoryItemName="Áo sơ mi hoa trắng ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-45612",SKUCode="ASMHN01-VA-L",InventoryItemName="Áo phông trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-45613",SKUCode="ASMHN02-VA-L",InventoryItemName="Áo phông trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-45614",SKUCode="ASMHN07-VA-L",InventoryItemName="Áo phông ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45614",SKUCode="ASMHN07-VA-L",InventoryItemName="Áo ba lỗ trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45614",SKUCode="ASMHN07-VA-L",InventoryItemName="Áo trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45614",SKUCode="ASMHN07-VA-L",InventoryItemName="Áo cộc",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45614",SKUCode="ASMHN07-VA-L",InventoryItemName="Áo ",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45614",SKUCode="ASMHN07-VA-L",InventoryItemName="Áo phông trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45614",SKUCode="ASMHN07-VA-L",InventoryItemName="Áo  trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

              new ItemDetails{ RefID = "123a-45615",SKUCode="ASMHN03-VA-L",InventoryItemName="Áo T-shirt trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45615",SKUCode="ASMHN03-VA-L",InventoryItemName="Áo  trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45615",SKUCode="ASMHN03-VA-L",InventoryItemName="Áo T-shirt trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45615",SKUCode="ASMHN03-VA-L",InventoryItemName="Áo",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45615",SKUCode="ASMHN03-VA-L",InventoryItemName="Áo T-shirt trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},
              new ItemDetails{ RefID = "123a-45615",SKUCode="ASMHN03-VA-L",InventoryItemName="Áo T-shirt trơn",StockName="Cty",UnitName="Chiếc",Quantity=5,UnitPrice=150000,Amount=600000,VATRate=0,VATAmount=0,PayAmount=0},

        };
        public static List<ItemDetails> ListItemDetails { get { return _ListItemdetails; } set { _ListItemdetails = value; } }
        public string RefID { get; set; }
        public string SKUCode { get; set; }
        public string InventoryItemName { get; set; }
        public string StockName { get; set; }
        public string UnitName { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
        public int Amount { get; set; }
        public int PayAmount { get; set; }
        public int VATAmount { get; set; }
        public int VATRate { get; set; }
    }
}