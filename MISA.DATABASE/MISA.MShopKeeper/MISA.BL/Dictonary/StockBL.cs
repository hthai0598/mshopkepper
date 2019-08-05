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
    public class StockBL
    {
        /// <summary>
        /// Laấy ra danh sách Stock  
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Stock> GetDataStock()
        {
            StockDAL stockDAL = new StockDAL();
            //BaseBL<Stock> baseBL = new BaseBL<Stock>();
            return stockDAL.GetData("[dbo].[Proc_GetStocks]");
        }
    }
}
