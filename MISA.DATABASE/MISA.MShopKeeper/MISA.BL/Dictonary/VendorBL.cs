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
using MISA.DAL.Dictonary;

namespace MISA.BL.Dictonary
{
    public class VendorBL
    {

        /// <summary>
        /// Lấy da danh sách các nhà cung cấp
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Vendor> GetDataVendor()
        {
            VendorDAL vendorDAL = new VendorDAL();

            return vendorDAL.GetData("[dbo].[Proc_GetVendors]");
        }
    }
}
