using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Vendor
    {
        #region Property
        /// <summary>
        ///Khóa chính nhà cung cấp
        /// </summary>
        public Guid VendorID { get; set; }
        /// <summary>
        /// Mã nhà cung cấp
        /// </summary>
        public string VendorCode { get; set; }
        /// <summary>
        /// Tên nhà cung cấp
        /// </summary>
        public string VendorName { get; set; }
        /// <summary>
        /// Tên liên hệ
        /// </summary>
        public string ContactName { get; set; }
        /// <summary>
        /// ĐỊa chỉ liên hệ
        /// </summary>
        public string ContactAddress { get; set; }
        #endregion
    }
}
