using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class RefDetail
    {

        #region Property
        /// <summary>
        /// Khóa chính refDetail
        /// </summary>
        public Guid RefDetailID { get; set; }
        /// <summary>
        /// Mã SKU code
        /// </summary>
        public string SKUCode { get; set; }
        /// <summary>
        /// Tên nhà cung cấp
        /// </summary>
        public string InventoryItemName { get; set; }
        /// <summary>
        /// Đơn giá
        /// </summary>
        public decimal UnitPrice { get; set; }
        /// <summary>
        /// Số lượng
        /// </summary>
        public int Quantity { get; set; }
        /// <summary>
        /// Tiền chiết khấu
        /// </summary>
        public decimal DiscountAmount { get; set; }
        /// <summary>
        /// Phần trăm chiết khấu
        /// </summary>
        public decimal DiscountRate { get; set; }
        /// <summary>
        /// Tiền thuế
        /// </summary>
        public decimal VATAmount { get; set; }
        /// <summary>
        /// Tổng thanh toán
        /// </summary>
        public decimal PayAmount { get; set; }
        /// <summary>
        /// Tổng tiền
        /// </summary>
        public decimal Amount { get; set; }
        /// <summary>
        /// Trạng thái import thành công
        /// </summary>
        public bool IsImportSucess { get; set; }
        /// <summary>
        /// Tên kho
        /// </summary>
        public string StockName { get; set; }
        /// <summary>
        /// Tên đơn vị
        /// </summary>
        public string UnitName { get; set; }
        /// <summary>
        /// Thuế suất
        /// </summary>
        public decimal VATRate { get; set; }
        /// <summary>
        /// Khóa chính bảng inventoryitem
        /// </summary>
        public Guid InventoryItemID { get; set; }
        /// <summary>
        /// Ngày tạo
        /// </summary>
        public DateTime CreatedDate { get; set; }
        /// <summary>
        /// Tạo bởi
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        public DateTime ModifiedDate { get; set; }
        /// <summary>
        /// Sửa bởi
        /// </summary>
        public string ModifiedBy { get; set; }
        //public Empolyee empolyee { get; set; }
        //public Vendor vendor { get; set; }

        public decimal CostPrice { get; set; }

        /// <summary>
        /// Khóa chinh kho
        /// </summary>
        public Guid StockID { get; set; }
        #endregion



    }
}
