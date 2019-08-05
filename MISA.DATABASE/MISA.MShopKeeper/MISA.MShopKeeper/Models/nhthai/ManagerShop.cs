using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MISA.DemoShop.Models
{
    public class ManagerShop
    {
        static List<ManagerShop> _ListManagerShop = new List<ManagerShop>()
        {
            new ManagerShop{EmployeeCode = "NV0000001",  RefID =  "123a-4561",RefNo="NK0000001",RefDate=DateTime.Now,AccountObjectName="JUNA",Code="NCC000001",TotalAmount=1320000,EmployeeName="Ngô Hoàng Thái",JournalMemo="Mua hàng"},
            new ManagerShop{EmployeeCode = "NV0000002",  RefID =  "123a-4562",RefNo="NK0000002",RefDate=DateTime.Now,AccountObjectName="POSTMAN",Code="NCC000002",TotalAmount=1043000,EmployeeName="Ngô Quyền",JournalMemo="Mua hàng online"},
            new ManagerShop{EmployeeCode = "NV0000003",  RefID =  "123a-4563",RefNo="NK0000003",RefDate=DateTime.Now,AccountObjectName="BOO",Code="NCC000003",TotalAmount=214210,EmployeeName="Ngô Bảo Châu",JournalMemo="Mua hàng nợ tiền"},
            new ManagerShop{EmployeeCode = "NV0000004",  RefID =  "123a-4564",RefNo="NK0000004",RefDate=DateTime.Now,AccountObjectName="JUNA",Code="NCC000004",TotalAmount=234320000,EmployeeName="Trần Đức Nam",JournalMemo="Mua hàng online"},
            new ManagerShop{EmployeeCode = "NV0000005",  RefID =  "123a-4565",RefNo="NK0000005",RefDate=DateTime.Now,AccountObjectName="BOO",Code="NCC000005",TotalAmount=32430,EmployeeName="Ngô Hoàng Thái",JournalMemo="Khách yêu cầu gói đồ cẩn thận"},
            new ManagerShop{EmployeeCode = "NV0000006",  RefID =  "123a-4566",RefNo="NK0000006",RefDate=DateTime.Now,AccountObjectName="KINGSMAN",Code="NCC000006",TotalAmount=321000,EmployeeName="Ngô Hoàng Thái",JournalMemo="Mua hàng online"},
            new ManagerShop{EmployeeCode = "NV0000006",  RefID =  "123a-4567",RefNo="NK0000007",RefDate=DateTime.Now,AccountObjectName="KINGSMAN",Code="NCC000007",TotalAmount=42320000,EmployeeName="Ngô Hoàng Long",JournalMemo="Khách khó tính"},
            new ManagerShop{EmployeeCode = "NV0000001",  RefID =  "123a-4568",RefNo="NK0000008",RefDate=DateTime.Now,AccountObjectName="LUNA",Code="NCC000008",TotalAmount=13420,EmployeeName="Nguyễn Thành Trân",JournalMemo="Khách yêu cầu gói đồ cẩn thận"},
            new ManagerShop{EmployeeCode = "NV0000004",  RefID =  "123a-4569",RefNo="NK0000009",RefDate=DateTime.Now,AccountObjectName="JUNA",Code="NCC000008",TotalAmount=134000,EmployeeName="Dung Hà",JournalMemo="Khách yêu cầu gói đồ cẩn thận"},
            new ManagerShop{EmployeeCode = "NV0000005",  RefID =  "123a-45610",RefNo="NK00000010",RefDate=DateTime.Now,AccountObjectName="LUNA",Code="NCC0000010",TotalAmount=6400000,EmployeeName="Trần Bảo",JournalMemo="Mua hàng online"},
            new ManagerShop{EmployeeCode = "NV0000006",  RefID =  "123a-45611",RefNo="NK00000011",RefDate=DateTime.Now,AccountObjectName="JUNO",Code="NCC0000011",TotalAmount=1567000,EmployeeName="Ngô Hoàng Thái",JournalMemo="Yêu cầu giao nhanh"},
            new ManagerShop{EmployeeCode = "NV0000007",  RefID =  "123a-45612",RefNo="NK00000012",RefDate=DateTime.Now,AccountObjectName="NEM",Code="NCC0000012",TotalAmount=1435000,EmployeeName="Phùng Thanh Độ",JournalMemo="Mua hàng online"},
            new ManagerShop{EmployeeCode = "NV00000012",  RefID =  "123a-45613",RefNo="NK00000013",RefDate=DateTime.Now,AccountObjectName="NEM",Code="NCC0000013",TotalAmount=1000000,EmployeeName="Phùng Anh Đức",JournalMemo="Khách yêu cầu gói đồ cẩn thận"},
            new ManagerShop{EmployeeCode = "NV00000012",  RefID =  "123a-45614",RefNo="NK00000013",RefDate=DateTime.Now,AccountObjectName="ASPS",Code="NCC0000014",TotalAmount=150000,EmployeeName="Nguyễn Trung Thảo",JournalMemo="Yêu cầu giao nhanh"},
            new ManagerShop{EmployeeCode = "NV0000001",  RefID =  "123a-45615",RefNo="NK00000014",RefDate=DateTime.Now,AccountObjectName="WDSZ",Code="NCC0000015",TotalAmount=1067000,EmployeeName="Trần Khánh Hưng",JournalMemo="Mua hàng"},
            new ManagerShop{EmployeeCode = "NV0000041",  RefID =  "123a-45616",RefNo="NK00000015",RefDate=DateTime.Now,AccountObjectName="GUCCI",Code="NCC0000016",TotalAmount=15600000,EmployeeName="Trần Đức Nam",JournalMemo="Mua hàng online"},
            new ManagerShop{EmployeeCode = "NV0000021",  RefID =  "123a-45617",RefNo="NK00000016",RefDate=DateTime.Now,AccountObjectName="GUCCI",Code="NCC0000017",TotalAmount=160000,EmployeeName="Ngô Hoàng Thái",JournalMemo="Yêu cầu giao nhanh"},
            new ManagerShop{EmployeeCode = "NV0000041",  RefID =  "123a-45618",RefNo="NK00000017",RefDate=DateTime.Now,AccountObjectName="BOO",Code="NCC0000018",TotalAmount=12000,EmployeeName="Ngô Hương Lan",JournalMemo=""},
            new ManagerShop{EmployeeCode = "NV0000001",  RefID =  "123a-45619",RefNo="NK00000018",RefDate=DateTime.Now,AccountObjectName="JUNA",Code="NCC0000019",TotalAmount=143000,EmployeeName="Ngô Bảo Châu",JournalMemo=""},

        };
        public static List<ManagerShop> ListManagerShop  { get { return _ListManagerShop; } set { _ListManagerShop = value; } }
        public string RefID { get; set; }
        public string RefNo { get; set; }
        public string Code { get; set; }
        public DateTime RefDate { get; set; }
        public string JournalMemo { get; set; }
        public int TotalAmount { get; set; }
        public string AccountObjectName { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeCode { get; set; }







    }
}