using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Empolyee
    {
        #region Property
        /// <summary>
        /// khóa chính nhân viên
        /// </summary>
        public Guid EmployeeID { get; set; }
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string EmployeeName { get; set; }
        #endregion


    }
}
