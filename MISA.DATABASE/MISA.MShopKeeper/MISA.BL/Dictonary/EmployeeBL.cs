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
    public class EmployeeBL
    {
        
      /// <summary>
      /// Lấy ra danh sách nhân viên
      /// </summary>
      /// <returns></returns>
        public IEnumerable<Empolyee> GetDataEmpolyee()
        {
            EmployeeDAL employeeDAL = new EmployeeDAL();
            return employeeDAL.Get();
            //BaseBL<Empolyee> baseBL = new BaseBL<Empolyee>();
            //return baseBL.GetData("[dbo].[Proc_GetDataEmployees]");
        }
    }
}
