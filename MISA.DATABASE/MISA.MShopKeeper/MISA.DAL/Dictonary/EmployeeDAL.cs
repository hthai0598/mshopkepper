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
    public class EmployeeDAL: BaseDAL<Empolyee>
    {
        /// <summary>
        /// Lấy ra danh sách nhân viên
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public IEnumerable<Empolyee> Get()
        {
            return GetData("[dbo].[Proc_GetDataEmployees]");
        }

    }
}
