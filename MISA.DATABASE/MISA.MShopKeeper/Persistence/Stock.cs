using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Stock
    {
        #region Property
        /// <summary>
        ///Khóa chính Stock
        /// </summary>
        public Guid StockID { get; set; }
        /// <summary>
        /// Mã Stock
        /// </summary>
        public string StockCode { get; set; }
        /// <summary>
        /// Tên Stock
        /// </summary>
        public string StockName { get; set; }
        #endregion

    }
}
