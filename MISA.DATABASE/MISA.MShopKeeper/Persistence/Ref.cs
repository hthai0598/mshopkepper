using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Ref
    {
        #region Property
        /// <summary>
        /// Khóa chính bảng ref
        /// </summary>
        public Guid RefID { get; set; }
        /// <summary>
        /// Số phiếu nhập
        /// </summary>
        public string RefNo { get; set; }
        /// <summary>
        /// Loại phiếu nhập
        /// </summary>
        public int RefType { get; set; }
        /// <summary>
        /// Ngày nhập
        /// </summary>
        public DateTime RefDate { get; set; }
        /// <summary>
        /// Tổng tiền
        /// </summary>
        public decimal TotalAmount { get; set; }
        /// <summary>
        /// Diễn giải
        /// </summary>
        public string JournalMemo { get; set; }
        /// <summary>
        /// Người tạo
        /// </summary>
        public string ContactName { get; set; }
        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime CreateDate { get; set; }
        /// <summary>
        /// Người chỉnh sửa
        /// </summary>
        public string ModifiedBy { get; set; }
        /// <summary>
        /// Tên nhà cung cấp
        /// </summary>
        public string VendorName { get; set; }
        /// <summary>
        /// Tên khách hàng
        /// </summary>
        public string EmployeeName { get; set; }
        /// <summary>
        /// Danh sách RefDetali
        /// </summary>
        public List<RefDetail> RefDetails { get; set; }
        /// <summary>
        /// khóa chính nhân viên
        /// </summary>
        public Guid EmployeeID { get; set; }
        /// <summary>
        /// Khóa chính nhà cun cấp
        /// </summary>

        public Guid VendorID { get; set; }
        /// <summary>
        /// Mã nhà cung cấp
        /// </summary>
        public string VendorCode { get; set; }
        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Giới tính
        /// </summary>
        public int Gender { get; set; }
        #endregion
    }
}
