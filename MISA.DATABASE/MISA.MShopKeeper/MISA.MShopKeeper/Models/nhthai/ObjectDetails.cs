using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.DemoShop.Models
{
    public class ObjectDetails
    {
        static List<ObjectDetails> _ListObject = new List<ObjectDetails>()
        {
             new ObjectDetails{Address="Hà Nội",BakEditMode=0,Code="NCC000001",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Ins",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Hải Phòng",BakEditMode=0,Code="NCC000002",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may MISA",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Huế",BakEditMode=0,Code="NCC000003",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may VNP",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Hà Nội",BakEditMode=0,Code="NCC000004",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Viettel",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Hà Nội",BakEditMode=0,Code="NCC000005",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Việt Hà",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Cà Mau",BakEditMode=0,Code="NCC000006",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Facebook Hà",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Vũng Tàu",BakEditMode=0,Code="NCC000007",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Long Lanh",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Đồng Tháp",BakEditMode=0,Code="NCC000008",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Việt Hà",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Nghệ An",BakEditMode=0,Code="NCC000009",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Việt Hà",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Đà Nẵng",BakEditMode=0,Code="NCC000010",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Không may",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
             new ObjectDetails{Address="Hải Dương",BakEditMode=0,Code="NCC000011",EditMode=0,IsAutoGenPrimaryKey=true,Name="Nhà may Việt Hà",ObjectDetailID=new Guid(),TypeName="Nhà cung cấp"},
        };
        public static List<ObjectDetails> ListObject { get { return _ListObject; } set { _ListObject = value; } }
        public string Address { get; set; }
        public int BakEditMode { get; set; }
        public string Code { get; set; }
        public int EditMode { get; set; }
        public bool IsAutoGenPrimaryKey { get; set; }
        public string Name { get; set; }
        public Guid ObjectDetailID { get; set; }
        public string TypeName { get; set; }
    }
}