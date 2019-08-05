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
using MISA.DAL.Dictonary;
using MISA.BL.Base;
namespace MISA.BL.Dictonary
{
    public class RefDetailBL
    {

        /// <summary>
        /// Lấy dữ liệ của RefDetails
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<RefDetail> GetDataRefDetail(object[] id)
        {
            RefDetailDAL refDetailDAL = new RefDetailDAL();
            BaseBL<RefDetail> baseBL = new BaseBL<RefDetail>();
            return refDetailDAL.GetEntities("Proc_GetRefDetailsStockByRefId", id);
        }

        /// <summary>
        /// Kiểm tra RefNo khi tạo hóa đơn
        /// </summary>
        /// <param name="r"></param>
        /// <returns></returns>
        public bool CheckRefDetail(Ref r)
        {
            RefDetailDAL refDetailDAL = new RefDetailDAL();
            return refDetailDAL.CheckRefDetail(r);
        }

    }
}
