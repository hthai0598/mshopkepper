using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Data;
using Persistence;
using MISA.DAL.Dictonary;
using MISA.DAL;
using System.Collections.Generic;

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {


        [TestMethod]
        public void TestMethod1()
        {
            RefDAL refDAL = new RefDAL();
            Ref r = new Ref();
            var res = new RefDetail();
            r.RefDetails = new List<RefDetail>();




            // Thêm bẳng Ref
            r.RefNo = "NK0000100";  //thêm mã hóa đơn
            string iDate = "2005-05-05";
            r.RefDate = DateTime.Parse(iDate); //ngày hóa đơn
            r.JournalMemo = "Thái đẹp trai vl"; //mô tả hóa đơn
            r.VendorID = Guid.Parse("E1D3EC06-B0B7-8A3A-2395-02BEE389761E"); // khởi tạo nhà cung cấp
            r.EmployeeID = Guid.Parse("19D865A4-1CCD-0F2D-A757-0518E0B5E4A6"); //thêm mới nhân viên
            






            //Thêm bảng RefDetails
            res.InventoryItemID = Guid.Parse("1FC2F63C-08B1-7630-3858-00A0E7C57734"); // thêm mới danh sách sản phẩm
            res.Quantity = 2;
            res.Amount = 200;
            res.DiscountRate = 3;
            res.DiscountAmount = 4;
            res.VATRate = 5;
            res.VATAmount = 6;
            res.StockID = Guid.Parse("3d277d90-eb0a-540e-34a5-48af2457c1e8");
            r.RefDetails.Add(res);

            res.InventoryItemID = Guid.Parse("8BD2AD59-23DA-79E8-BB5F-03FCEF7A0D8E"); // thêm mới danh sách sản phẩm
            res.Quantity = 2;
            res.Amount = 200;
            res.DiscountRate = 3;
            res.DiscountAmount = 4;
            res.VATRate = 5;
            res.StockID = Guid.Parse("3d277d90-eb0a-540e-34a5-48af2457c1e8");
            res.VATAmount = 6;
            r.RefDetails.Add(res);









            Assert.IsTrue(refDAL.CreateInvoice(r));

        }


        [TestMethod]
        public void TestMethod2()
        {
            RefDAL refDAL = new RefDAL();
            Assert.IsTrue(refDAL.CheckRefNo("NK0000200"));
        }


        [TestMethod]
        public void TestMethod3()
        {
            RefDAL refDAL = new RefDAL();
            var id = Guid.Parse("F98FA4A8-09E6-D403-1FF6-021EC8F4E5AF");
            Assert.IsTrue(refDAL.DeleteRef(id));
        }




        [TestMethod]
        public void TestMethod4()
        {
            RefDAL refDAL = new RefDAL();
            List<Guid> id = new List<Guid>();
            id.Add(Guid.Parse("97AECCCF-38E7-A8E6-4A5B-0137B4EB46D1"));
            id.Add(Guid.Parse("666C3824-0105-9E5B-B86B-0226A45DB0D2"));
            Assert.IsTrue(refDAL.DeleteRefs(id));
        }



        [TestMethod]
        public void TestMethod5()
        {
            RefDetailDAL refDetail = new RefDetailDAL();
            var list = refDetail.GetRefDetailByIDRef(Guid.Parse("d991d85e-7160-2e8e-ef13-fc1ba4c30caa"));
            Assert.IsNull(list);

        }


        //[TestMethod]
        //public void TestMethod6()
        //{
        //    RefDetailDAL refDetail = new RefDetailDAL();
        //    var list = refDetail.GetRefDetailByIDRef(Guid.Parse("d991d85e-7160-2e8e-ef13-fc1ba4c30caa"));
        //    Assert.IsNull(list);

        //}
    }
}
