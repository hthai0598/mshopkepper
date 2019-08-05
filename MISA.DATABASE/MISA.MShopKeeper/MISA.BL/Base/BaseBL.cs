using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.DAL;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using Persistence;
using MISA.DAL.Base;

namespace MISA.BL.Base
{
    public class BaseBL<T>
    {
        public BaseDAL<T> baseDAL;
        /// <summary>
        /// Khởi tạo Contrucster gọi class BaseDAL dành cho những phương thức chung
        /// </summary>
        /// 
        public BaseBL()
        {
            baseDAL = new BaseDAL<T>();
        }



        /// <summary>
        ///Gọi lại hàm Getdata trong tầng DAL. Hàm Getdata để lấy giữ liệu chung.
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IEnumerable<T> GetData(string query)
        {
            return baseDAL.GetData(query);
        }

        /// <summary>
        ///Gọi lại hàm GetEntities trong tầng DAL. Hàm GetEntities để lấy giữ liệu khi trung id gửi lên.
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IEnumerable<T> GetEntities(string query, object[] id)
        {
            return baseDAL.GetEntities(query,id);
        }

        public T GetEntitie(string query, object[] id)
        {
            return baseDAL.GetEntity(query, id);
        }

        /// <summary>
        ///Gọi lại hàm GetLastID trong tầng DAL. Hàm GetLastID để lấy No lớn nhất + 1
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public string GetLastID(string storeName, string tableName, string columnName, string prefix)
        {
            return baseDAL.GetLastID(storeName, tableName, columnName, prefix);
        }


        /// <summary>
        ///
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public bool DeleteEntity(Guid id, string storename)
        {
            return baseDAL.DeleteEnity(id, storename);
        }

        /// <summary>
        /// buli câu điều kiện và cột.
        /// </summary>
        /// <param name="pagingParameter"></param>
        /// <returns></returns>
        public async Task<Result> GetEntitiesPaging(PagingParameter pagingParameter)
        {
          
            var result = new Result();

            string selectString = PagingHelper.BuildSelectString(pagingParameter.Columns),
                        conditionString = PagingHelper.BuildContionString(pagingParameter.Filters);

            if (pagingParameter.RecordCount <= 0)
            {
                pagingParameter.RecordCount = 10;
            }
            if (pagingParameter.Page <= 0)
            {
                pagingParameter.Page = 1;
            }
            result = await baseDAL.GetEntiesPaging(selectString, conditionString, pagingParameter.RecordCount,
                pagingParameter.Page, pagingParameter.OrderBy);

            return result;
        }





    }
}
