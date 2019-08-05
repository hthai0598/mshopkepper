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

namespace MISA.DAL.Dictonary
{
    public class VendorDAL: BaseDAL<Vendor>
    {
        /// <summary>
        /// Lấy ra danh sách nhà cung câp
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IEnumerable<Vendor> GetRefDetail()
        {
                return GetData("[dbo].[Proc_GetVendors]");
        }
    }
}
