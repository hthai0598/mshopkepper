﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Enumeration
    {

        #region Property

        /// <summary>
        /// Trạng thái của thực thể
        /// </summary>
        public enum EntityState
        {
            None = 0, // Không trạng thái
            Add, // Thêm
            Update, // Sửa
            Delete // Xóa
        }

        /// <summary>
        /// Giới tính
        /// </summary>
        public enum Gender
        {
            Male = 0, // Nam
            Female, // Nữ
            Other // Khác
        }

        /// <summary>
        /// Loại Filter
        /// </summary>
        public enum FilterType
        {
            Contain = 0, // Chứa
            NotContain, // Không chứa
            BeginWith, // Bắt đầu với
            EndWith, // Kết thúc với
            Greater, // Lớn hơn
            GreaterOrEqual, // Lớn hơn hoặc bằng, 
            Less, // Nhỏ hơn
            LessOrEqual // Nhỏ hơn hoặc bằng
        }
        #endregion

    }
}
