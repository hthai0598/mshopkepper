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
    public class InvetoryItemDAL: BaseDAL<InventoryItem>
    {

        /// <summary>
        /// Lấy ra danh sách mặt hàng
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IEnumerable<InventoryItem> Get()
        {
            return GetData("[dbo].[Proc_GetItemDetails]");
        }


        /// <summary>
        /// Lấy ra item by id
        /// </summary>
        /// <param name="paramValue"></param>
        /// <returns></returns>
        public IEnumerable<InventoryItem> GetItemById( object[] paramValue)
        {
            return GetEntities("[dbo].[Proc_GetItemDetailById]", paramValue);
        }

    }
}
