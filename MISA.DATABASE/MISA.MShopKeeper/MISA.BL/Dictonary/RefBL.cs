using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using Persistence;
using MISA.DAL.Base;
using MISA.BL.Base;
using MISA.DAL;

namespace MISA.BL.Dictonary
{
    public class RefBL
    {


        /// <summary>
        /// Lấy dữ liệu của bảng Ref tầng BL
        /// </summary>
        /// <param name="a"></param>
        /// <returns></returns>
        /// 
        //public IEnumerable<Ref> GetDataRef()
        //{
        //    BaseBL<Ref> baseBL = new BaseBL<Ref>();
        //    return baseBL.GetData("[dbo].[Proc_GetRefsFull]");
        //}

        public IEnumerable<Ref> GetDataRef()
        {
            RefDAL refDAL = new RefDAL();
         
            return refDAL.Get();
        }




        /// <summary>
        /// Tạo mới Phiếu
        /// </summary>
        /// <param name="invoice"></param>
        /// <returns></returns>

        public bool CreateInvoice(Ref invoice)
        {
            RefDAL refDAL = new RefDAL();
            return refDAL.CreateInvoice(invoice);
        }
        /// <summary>
        /// Update Bảng Ref
        /// </summary>
        /// <param name="JournalMemo"></param>
        /// <param name="EmployeeID"></param>
        /// <param name="ContactName"></param>
        /// <param name="RefNo"></param>
        /// <returns></returns>
        public bool UpdateRef(string JournalMemo, Guid EmployeeID, string ContactName, string RefNo)
        {
            RefDAL refDAL = new RefDAL();
            return refDAL.Update_Ref(JournalMemo, EmployeeID, ContactName, RefNo);
        }


        /// <summary>
        /// Lấy ra Ref by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Ref GetRefByID(object[] id)
        {
            RefDAL refDAL = new RefDAL();
            return refDAL.GetEntity("[dbo].[Proc_GetRefByIDDiaLogShow]", id);
        }


        /// <summary>
        /// Lấy ra Ref by Date
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<Ref> GetRefByDate(DateTime[] id)
        {
            RefDAL refDAL = new RefDAL();
            return refDAL.GetEntities(id);
        }


        /// <summary>
        /// Kiểm tra trung RefNo trong DB
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool CheckRefNo(string id)
        {
            RefDAL refDAL = new RefDAL();
            return refDAL.CheckRefNo(id);
        }


        /// <summary>
        /// Xóa Ref theo  RefID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteEntity(Guid id)
        {
            RefDAL refDAL = new RefDAL();
            return refDAL.DeleteRef(id);
        }


        /// <summary>
        /// Xóa nhiều ref
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteEntitys(List<Guid> id)
        {
            RefDAL refDAL = new RefDAL();
            return refDAL.DeleteRefs(id);
        }
    }
}
