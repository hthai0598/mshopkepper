using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class InventoryItem
    {
        #region Property
        /// <summary>
        /// Khóa chính inventoryItem
        /// </summary>
        public Guid InventoryItemID { get; set; }
        /// <summary>
        /// Tên sản phẩm
        /// </summary>
        public string InventoryItemName { get; set; }
        /// <summary>
        /// Mã SKU
        /// </summary>
        public string SKUCode { get; set; }
        /// <summary>
        /// Kích cỡ
        /// </summary>
        public string Size { get; set; }
        /// <summary>
        /// Mã bar
        /// </summary>
        public string BarCode { get; set; }
        /// <summary>
        /// Màu sắc
        /// </summary>
        public string Color { get; set; }
        /// <summary>
        /// Giá
        /// </summary>
        public decimal CostPrice { get; set; }
        /// <summary>
        /// khóa chính đơn vị
        /// </summary>
        public Guid UnitID { get; set; }
        /// <summary>
        /// Tên đơn vị
        /// </summary>
        public string UnitName { get; set; }
        #endregion
    }
}
