
# 前端弹窗中心化管理方案

## 问题背景

在当前项目的主要流量落地页中，存在着多种弹窗组件，这些弹窗来自不同业务线的开发，由于缺乏统一的管理机制，经常出现多个弹窗同时展示的问题。产品需求要求新增弹窗时需要与现有弹窗进行兼容，实现互斥展示并合理调整优先级。然而，由于弹窗管理的分散性，这种控制变得异常困难，开发人员不仅需要充分了解项目中所有已有弹窗组件，还需要进行频繁的调整和适配。总结当前项目中弹窗管理痛点如下：

- **分散管理**：弹窗逻辑散布在各个页面，难以统一控制
- **优先级冲突**：多个弹窗同时触发，缺乏优先级机制
- **状态混乱**：弹窗显示状态难以追踪，容易重复显示
- **数据耦合**：弹窗显示逻辑与数据获取耦合

## 设计思路

- ✅ **中心化管理**：统一管理所有弹窗的状态和数据
- ✅ **优先级控制**：通过数字优先级控制弹窗显示顺序
- ✅ **状态机管理**：完整的弹窗生命周期：`PENDING → SHOWING → SHOWN/CLOSED`
- ✅ **双重条件验证**：前端条件 + 数据有效性检查
- ✅ **功能专一**：只负责弹窗逻辑控制，不涉及UI渲染，保持职责单一
- ✅ **互斥机制**：同时只显示一个弹窗，避免弹窗冲突
- ✅ **自动队列**：可关闭高优先级弹窗后自动检查低优先级弹窗
- ✅ **覆盖注册**：支持重复注册时的覆盖模式

## 工作流程

![sdk-code3-img1](/images/frontEnd/sdk/sdk-code3-img1.png)

## 使用方式

### 基础用法

```javascript
// 1. 引入弹窗管理器
import popupManager from '@/public/popup-manager.js';

// 2. 注册弹窗配置
popupManager.register({
  id: 'my-popup',                    // 唯一标识（必填）
  priority: 100,                     // 优先级（数字越大优先级越高）（必填）
  type: 'guide',                     // 弹窗类型（必填）
  shouldShow: () => true,            // 显示条件（主要为前端展示条件）
  getData: async () => ({ msg: 'Hello' }), // 异步数据获取（后端展示逻辑+弹窗渲染数据, 需要return真值， return null 则弹窗不展示）
  onShow: (result) => {              // 显示回调 result为getData return的值
    this.popupData = result.data;
    this.showPopup = true;
  },
  onClose: (result) => {             // 关闭回调
    this.showPopup = false;
  }
  meta: { /* 元数据 */ }           // 弹窗元数据（非必填）
});

// 3. 检查弹窗队列（注册弹窗后调用）
popupManager.checkQueue();

// 4. 关闭弹窗，通知管理中心 （关闭指定弹窗调用）
popupManager.closePopup('my-popup', {
  checkNext: true,      // 是否检查下一个弹窗
  markAsShown: true     // 是否标记为已显示
});
```

### 条件验证示例
#### 前端条件验证
```javascript
shouldShow: () => {
  // 检查用户状态、本地存储等前端条件
  const userInfo = uni.getStorageSync('userInfo');
  const hasSeenGuide = uni.getStorageSync('hasSeenGuide');
  return userInfo && !hasSeenGuide;
}
```

#### 数据有效性验证
```javascript
getData: async () => {
  try {
    const data = await api.getPopupData();
    
    // 验证必要字段
    if (!data || !data.requiredField) {
      throw new Error('数据不完整');
    }
    
    return data;
  } catch (error) {
    // 返回 null 表示数据无效，弹窗不显示
    return null;
  }
}
```

### 完整案例

以企业详情页的市场引导弹窗为例：

```vue
// vue/uniapp 项目
<template>
  <view>
    <!-- 市场引导弹窗A -->
    <MarketGuidePopA 
      :show="showMarketGuideA"
      :marketGuideData="marketGuideDataA"
      @close="handleCloseMarketGuideA"
    />
    
    <!-- 市场引导弹窗B -->
    <MarketGuidePopB 
      :show="showMarketGuideB"
      :marketGuideData="marketGuideDataB"
      @close="handleCloseMarketGuideB"
    />
  </view>
</template>

<script>
import popupManager from '@/public/popup-manager.js';
import MarketGuidePopA from '@/components/market/guide/MarketGuidePopA.vue';
import MarketGuidePopB from '@/components/market/guide/MarketGuidePopB.vue';

export default {
  components: { MarketGuidePopA, MarketGuidePopB },
  
  data() {
    return {
      showMarketGuideA: false,
      showMarketGuideB: false,
      marketGuideDataA: {},
      marketGuideDataB: {}
    };
  },
  
  onLoad() {
    this.initPopups();
  },
  
  onShow() {
    popupManager.checkQueue();
  },
  
  methods: {
    /**
     * 初始化弹窗配置
     */
    initPopups() {
      // 注册市场引导弹窗A（高优先级）
      popupManager.register({
        id: 'market-guide-pop-a',
        priority: 40,
        type: 'market-guide',
        shouldShow: () => {
          return this.shouldShowPopup('hasSeenMarketGuideA');
        },
        getData: async () => {
          try {
            const response = await this.$http({
              url: "/...........",
              data: { action: "get_user_recommend_opp_popup_a" }
            });
            
            const { status, data } = response ?? {};
            return status === 0 && data ? data : null;
          } catch (error) {
            console.error('获取弹窗A数据失败:', error);
            return null;
          }
        },
        onShow: (result) => {
          this.marketGuideDataA = result.data || {};
          this.showMarketGuideA = true;
        },
        onClose: (result) => {
          this.showMarketGuideA = false;
          this.updateStorageCount('hasSeenMarketGuideA');
        }
      });

      // 注册市场引导弹窗B（中优先级）  
      popupManager.register({
        id: 'market-guide-pop-b',
        priority: 30,
        type: 'market-guide',
        shouldShow: () => {
          return this.shouldShowPopup('hasSeenMarketGuideB');
        },
        getData: async () => {
          try {
            const response = await this.$http({
              url: "/..........",
              data: { action: "get_user_recommend_opp_popup_b" }
            });
            
            const { status, data } = response ?? {};
            return status === 0 && data ? data : null;
          } catch (error) {
            console.error('获取弹窗B数据失败:', error);
            return null;
          }
        },
        onShow: (result) => {
          this.marketGuideDataB = result.data || {};
          this.showMarketGuideB = true;
        },
        onClose: (result) => {
          this.showMarketGuideB = false;
          this.updateStorageCount('hasSeenMarketGuideB');
        }
      });
    },

    /**
     * 关闭弹窗A
     */
    async handleCloseMarketGuideA() {
      await popupManager.closePopup('market-guide-pop-a', { 
        checkNext: false,
        markAsShown: true
      });
    },

    /**
     * 关闭弹窗B
     */
    async handleCloseMarketGuideB() {
      await popupManager.closePopup('market-guide-pop-b', { 
        checkNext: false,
        markAsShown: true
      });
    },

    /**
     * 判断是否展示弹窗
     * 关闭一次当天不再弹出，关闭二次及以上7天内不再弹出
     */
    shouldShowPopup(storageKey) {
      const record = uni.getStorageSync(storageKey);
      if (!record) return true;
      
      const { time, count = 0 } = record;
      const today = new Date().toDateString();
      
      if (count <= 1) {
        return time !== today;
      }
      
      const daysDiff = Math.floor((new Date() - new Date(time)) / (1000 * 60 * 60 * 24));
      return daysDiff >= 7;
    },

    /**
     * 更新存储计数
     */
    updateStorageCount(storageKey) {
      const record = uni.getStorageSync(storageKey);
      const count = record?.count ?? 0;
      uni.setStorageSync(storageKey, {
        time: new Date().toDateString(),
        count: count + 1
      });
    }
  }
};
</script>
```

### 高级配置示例

```javascript
// 全局配置
popupManager.setGlobalConfig({
  autoCheckAfterClose: true,    // 关闭后自动检查其他弹窗
  maxRetryCount: 3,            // 最大重试次数
  showInterval: 500            // 弹窗显示间隔
});

// 查看所有弹窗状态
popupManager.getPopupStatus();
// 查看特定弹窗状态
const status = popupManager.getPopupStatus('my-popup');
// 重置特定弹窗
popupManager.resetPopups(['popup1', 'popup2']);
// 重置所有弹窗
popupManager.resetPopups();
// 移出指定弹窗
popupManager.removePopup('my-popup');
// 清空所有弹窗
popupManager.clear();
```

## 完整源码

```javascript
/**
 * 弹窗管理中心
 * @description 专注弹窗管理状态和数据，提供中心化的弹窗控制
 * @author hhd
 */

/**
 * 弹窗配置接口
 * @typedef {Object} PopupConfig
 * @property {string} id - 弹窗唯一标识
 * @property {number} priority - 弹窗优先级，数字越大优先级越高
 * @property {string} type - 弹窗类型（如：'guide', 'promotion', 'notice'等）
 * @property {Function} shouldShow - 判断是否应该显示的条件函数，返回布尔值
 * @property {Function|null} getData - 获取弹窗数据的函数，返回数据对象
 * @property {Function} onShow - 弹窗显示时的回调
 * @property {Function|null} onClose - 弹窗关闭时的回调
 * @property {Object} meta - 弹窗元数据
 */

/**
 * 弹窗状态枚举
 */
const POPUP_STATUS = {
  PENDING: 'PENDING',     // 等待显示
  SHOWING: 'SHOWING',     // 正在显示
  SHOWN: 'SHOWN',         // 已显示过
  CLOSED: 'CLOSED',       // 已关闭
  BLOCKED: 'BLOCKED'      // 被阻止显示
};

/**
 * 弹窗管理器类
 */
class PopupManager {
  constructor() {
    // 确保单例模式
    if (PopupManager.instance) {
      return PopupManager.instance;
    }
    
    this.popupQueue = new Map();        // 弹窗队列，使用Map保证顺序
    this.currentPopup = null;           // 当前显示的弹窗
    this.isCheckingQueue = false;       // 是否正在检查队列
    this.globalConfig = {
      autoCheckAfterClose: true,        // 关闭后自动检查其他弹窗
      maxRetryCount: 3,                 // 最大重试次数
      showInterval: 500                 // 弹窗显示间隔（毫秒）
    };
    
    PopupManager.instance = this;
  }

  /**
   * 注册弹窗配置（支持覆盖模式）
   * @param {PopupConfig} config 弹窗配置
   * @param {boolean} override 是否覆盖已存在的弹窗，默认true
   * @returns {PopupManager} 返回自身实现链式调用
   */
  register(config, override = true) {
    // 参数验证
    if (!this.validateConfig(config)) {
      console.error('[PopupManager] 无效的弹窗配置:', config);
      return this;
    }

    // 检查是否已存在
    if (this.popupQueue.has(config.id)) {
      if (override) {
        console.warn(`[PopupManager] 覆盖已存在的弹窗: ${config.id}`);
      } else {
        console.warn(`[PopupManager] 弹窗 ${config.id} 已存在，跳过注册`);
        return this;
      }
    }

    // 初始化弹窗状态
    const popupItem = {
      ...config,
      status: POPUP_STATUS.PENDING,
      retryCount: 0,
      lastCheckTime: 0,
      data: null,
      registeredTime: Date.now()
    };

    this.popupQueue.set(config.id, popupItem);
    console.log(`[PopupManager] 注册弹窗: ${config.id}, 优先级: ${config.priority}`);
    
    return this;
  }

  /**
   * 验证弹窗配置
   * @param {PopupConfig} config 
   * @returns {boolean}
   */
  validateConfig(config) {
    const requiredFields = ['id', 'priority', 'type', 'shouldShow', 'onShow'];
    
    return requiredFields.every(field => {
      if (!Object.hasOwn(config, field)) {
        console.error(`[PopupManager] 缺少必需字段: ${field}`);
        return false;
      }
      if (field === 'shouldShow' || field === 'onShow') {
        if (typeof config[field] !== 'function') {
          console.error(`[PopupManager] ${field} 必须是函数`);
          return false;
        }
      }
      return true;
    });
  }

  /**
   * 设置全局配置
   * @param {Object} config 全局配置
   * @returns {PopupManager}
   */
  setGlobalConfig(config) {
    this.globalConfig = { ...this.globalConfig, ...config };
    return this;
  }

  /**
   * 检查并显示弹窗队列
   * @param {Object} options 检查选项
   * @returns {Promise<boolean>} 是否成功显示弹窗
   */
  async checkQueue(options = {}) {
    const { force = false, excludeIds = [] } = options;
    
    // 防止重复检查
    if (this.isCheckingQueue && !force) {
      return false;
    }

    this.isCheckingQueue = true;

    try {
      // 如果当前有弹窗在显示，则不处理
    //   if (this.currentPopup && !force) {
    //     return false;
    //   }

      // 获取可显示的弹窗列表，按优先级排序
      const availablePopups = await this.getAvailablePopups(excludeIds);
      
      if (availablePopups.length === 0) {
        return false;
      }

      // 显示优先级最高的弹窗
      const popupToShow = availablePopups[0];
      return await this.showPopup(popupToShow.id);

    } catch (error) {
      console.error('[PopupManager] 检查队列时发生错误:', error);
      return false;
    } finally {
      this.isCheckingQueue = false;
    }
  }

  /**
   * 获取可显示的弹窗列表
   * @param {Array<string>} excludeIds 排除的弹窗ID列表
   * @returns {Promise<Array>} 可显示的弹窗列表
   */
  async getAvailablePopups(excludeIds = []) {
    const availablePopups = [];

    for (const [id, popup] of this.popupQueue) {
      // 跳过排除的弹窗
      if (excludeIds.includes(id)) {
        continue;
      }

      // 跳过已显示过或被阻止的弹窗
      if ([POPUP_STATUS.SHOWN, POPUP_STATUS.BLOCKED, POPUP_STATUS.SHOWING].includes(popup.status)) {
        continue;
      }

      // 检查重试次数
      if (popup.retryCount >= this.globalConfig.maxRetryCount) {
        popup.status = POPUP_STATUS.BLOCKED;
        continue;
      }

      // 检查显示条件（包含数据验证）
      try {
        const canShow = await this.checkPopupConditions(popup);
        if (canShow) {
          availablePopups.push(popup);
        }
      } catch (error) {
        console.error(`[PopupManager] 检查弹窗 ${id} 显示条件时发生错误:`, error);
        popup.retryCount++;
      }
    }

    // 按优先级降序排序
    return availablePopups.sort((a, b) => b.priority - a.priority);
  }

  /**
   * 检查弹窗显示条件（包含前端条件和数据验证）
   * @param {Object} popup 弹窗配置
   * @returns {Promise<boolean>} 是否可以显示
   */
  async checkPopupConditions(popup) {
    // 1. 先检查前端条件
    if (!popup.shouldShow()) {
      return false;
    }

    // 2. 如果有 getData 函数，则获取并验证数据
    if (popup.getData && typeof popup.getData === 'function') {
      try {
        const data = await popup.getData();
        
        // 数据验证：检查数据是否有效
        if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
          console.warn(`[PopupManager] 弹窗 ${popup.id} 数据为空，跳过显示`);
          return false;
        }
        
        // 缓存获取到的数据
        popup.data = data;
        return true;
      } catch (error) {
        console.error(`[PopupManager] 获取弹窗 ${popup.id} 数据失败:`, error);
        return false;
      }
    }

    return true;
  }

  /**
   * 显示指定弹窗
   * @param {string} popupId 弹窗ID
   * @returns {Promise<boolean>} 是否成功显示
   */
  async showPopup(popupId) {
    const popup = this.popupQueue.get(popupId);
    
    if (!popup) {
      console.error(`[PopupManager] 弹窗 ${popupId} 不存在`);
      return false;
    }

    if (popup.status === POPUP_STATUS.SHOWING) {
      console.warn(`[PopupManager] 弹窗 ${popupId} 已在显示中`);
      return false;
    }

    try {
      // 使用已缓存的数据（在 checkPopupConditions 中已获取）
      const popupData = popup.data || null;

      // 更新弹窗状态
      popup.status = POPUP_STATUS.SHOWING;
      popup.lastCheckTime = Date.now();
      this.currentPopup = popup;

      // 调用显示回调
      const showResult = {
        popupId,
        popupType: popup.type,
        data: popupData,
        meta: popup.meta || {},
        priority: popup.priority
      };

      await popup.onShow(showResult);
      return true;

    } catch (error) {
      console.error(`[PopupManager] 显示弹窗 ${popupId} 时发生错误:`, error);
      popup.status = POPUP_STATUS.PENDING;
      popup.retryCount++;
      this.currentPopup = null;
      return false;
    }
  }

  /**
   * 关闭弹窗
   * @param {string} popupId 弹窗ID
   * @param {Object} options 关闭选项
   * @returns {Promise<boolean>} 是否成功关闭
   */
  async closePopup(popupId, options = {}) {
    const { 
      checkNext = this.globalConfig.autoCheckAfterClose,
      markAsShown = true 
    } = options;

    const popup = this.popupQueue.get(popupId);
    
    if (!popup) {
      console.error(`[PopupManager] 弹窗 ${popupId} 不存在`);
      return false;
    }

    try {
      // 调用关闭回调
      if (popup.onClose && typeof popup.onClose === 'function') {
        await popup.onClose({
          popupId,
          popupType: popup.type,
          data: popup.data,
          meta: popup.meta || {}
        });
      }

      // 更新状态
      popup.status = markAsShown ? POPUP_STATUS.SHOWN : POPUP_STATUS.CLOSED;
      
      // 清除当前弹窗引用
      if (this.currentPopup?.id === popupId) {
        this.currentPopup = null;
      }

      // 检查下一个弹窗
      if (checkNext) {
        setTimeout(() => {
          this.checkQueue();
        }, this.globalConfig.showInterval);
      }

      return true;

    } catch (error) {
      console.error(`[PopupManager] 关闭弹窗 ${popupId} 时发生错误:`, error);
      return false;
    }
  }

  /**
   * 重置弹窗状态
   * @param {string|Array<string>} popupIds 弹窗ID或ID数组，不传则重置所有
   * @returns {PopupManager}
   */
  resetPopups(popupIds = null) {
    const idsToReset = popupIds ? 
      (Array.isArray(popupIds) ? popupIds : [popupIds]) : 
      Array.from(this.popupQueue.keys());

    idsToReset.forEach(id => {
      const popup = this.popupQueue.get(id);
      if (popup) {
        popup.status = POPUP_STATUS.PENDING;
        popup.retryCount = 0;
        popup.lastCheckTime = 0;
        popup.data = null;
      }
    });

    return this;
  }

  /**
   * 移除弹窗
   * @param {string} popupId 弹窗ID
   * @returns {boolean} 是否成功移除
   */
  removePopup(popupId) {
    const isRemoved = this.popupQueue.delete(popupId);
    
    if (this.currentPopup?.id === popupId) {
      this.currentPopup = null;
    }

    if (isRemoved) {
      console.log(`[PopupManager] 移除弹窗: ${popupId}`);
    }
    
    return isRemoved;
  }

  /**
   * 获取弹窗状态信息
   * @param {string} popupId 弹窗ID，不传则返回所有
   * @returns {Object|Array} 弹窗状态信息
   */
  getPopupStatus(popupId = null) {
    if (popupId) {
      const popup = this.popupQueue.get(popupId);
      return popup ? {
        id: popup.id,
        type: popup.type,
        status: popup.status,
        priority: popup.priority,
        retryCount: popup.retryCount,
        lastCheckTime: popup.lastCheckTime,
        registeredTime: popup.registeredTime
      } : null;
    }

    // 返回所有弹窗状态
    const statusList = [];
    for (const [popup] of this.popupQueue) {
      statusList.push({
        id: popup.id,
        type: popup.type,
        status: popup.status,
        priority: popup.priority,
        retryCount: popup.retryCount,
        lastCheckTime: popup.lastCheckTime,
        registeredTime: popup.registeredTime
      });
    }
    
    return statusList.sort((a, b) => a.priority - b.priority);
  }

  /**
   * 清空所有弹窗
   * @returns {PopupManager}
   */
  clear() {
    this.popupQueue.clear();
    this.currentPopup = null;
    this.isCheckingQueue = false;
    console.log('[PopupManager] 清空所有弹窗');
    return this;
  }

  /**
   * 获取当前显示的弹窗信息
   * @returns {Object|null}
   */
  getCurrentPopup() {
    return this.currentPopup ? {
      id: this.currentPopup.id,
      type: this.currentPopup.type,
      data: this.currentPopup.data,
      meta: this.currentPopup.meta || {}
    } : null;
  }
}

// 导出单例实例
const popupManager = new PopupManager();

export default popupManager;
export { POPUP_STATUS }; 
```

## 常见问题

### Q: 弹窗不显示怎么办？
A: 检查以下几点：
1. `shouldShow()` 是否返回 `true`
2. `getData()` 是否返回有效数据（非 `null`）
3. 是否调用了 `checkQueue()`
4. 查看控制台错误信息

### Q: 数据获取失败如何处理？
A: 在 `getData()` 中返回 `null`，弹窗管理器会自动跳过该弹窗

### Q: 如何控制弹窗显示顺序？
A: 通过 `priority` 字段控制，数字越大优先级越高

### Q: 如何禁用某个弹窗？
A: 在 `shouldShow()` 中返回 `false`，或者调用 `removePopup(id)` 移除

## 版本历史

### v2.0 (当前版本)
- ✅ 解决异步数据问题
- ✅ 支持双重条件判断
- ✅ 简化代码结构
- ✅ 优化错误处理
- ✅ 可多次获取状态

### v1.0
- ✅ 基础弹窗管理功能
- ✅ 优先级控制
- ✅ 互斥机制 