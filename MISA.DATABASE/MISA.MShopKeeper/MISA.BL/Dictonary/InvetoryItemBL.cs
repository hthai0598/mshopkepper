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
    public class InvetoryItemBL
    {

        //public IEnumerable<InventoryItem> GetDataInventoryItem()
        //{
        //    BaseBL<InventoryItem> baseBL = new BaseBL<InventoryItem>();
        //    return baseBL.GetData("[dbo].[Proc_GetItemDetails]");
        //}
        InvetoryItemDAL invetoryItemDAL = new InvetoryItemDAL();


        /// <summary>
        /// Lấy ra danh sách các sản phẩm
        /// </summary>
        /// <returns></returns>
        public IEnumerable<InventoryItem> GetDataInventoryItem()
        {
            return invetoryItemDAL.Get();
        }

   

        /// <summary>
        /// Lấy ra sản phẩm theo id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<InventoryItem> GetDataRefDetail(object[] id)
        {

            return invetoryItemDAL.GetItemById(id);
        }
    }
}
