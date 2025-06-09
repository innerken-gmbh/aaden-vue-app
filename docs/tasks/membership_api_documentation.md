# 会员系统API文档

## DTO定义

### 系统管理相关DTO

#### MembershipSystemDTO

```kotlin
data class MembershipSystemDTO(
    val id: Long?,                    // 会员系统ID
    val displayInfo: DisplayInfo,     // 显示信息
    val active: Boolean,              // 是否激活
    val pointRule: PointRuleDTO?,     // 积分规则
    val blId: Long                    // 商户ID
)
```

#### DisplayInfo

```kotlin
data class DisplayInfo(
    val name: String = "",            // 名称
    val description: String = "",     // 描述
    val imageUrl: String = "",        // 图片URL
    val color: String = "#ffffff"     // 颜色
)
```

#### PointRuleDTO

```kotlin
data class PointRuleDTO(
    val id: Long?,                    // 积分规则ID
    val displayInfo: DisplayInfo,     // 显示信息
    val pointsPerUnit: BigDecimal,    // 每单位消费获得的积分
    val minimumSpend: BigDecimal,     // 最低消费金额
    val maxPointsPerTransaction: Int?, // 每笔交易最大积分
    val expirationDays: Int?          // 积分过期天数
)
```

### 会员等级相关DTO

#### MembershipLevelDTO

```kotlin
data class MembershipLevelDTO(
    val id: Long?,                    // 会员等级ID
    val displayInfo: DisplayInfo,     // 显示信息
    val requiredPoints: Int,          // 所需积分
    val levelOrder: Int,              // 等级顺序
    val membershipSystemId: Long,     // 会员系统ID
    val membershipBenefits: List<MembershipBenefitWithTriggerDTO> = emptyList() // 会员系统权益
)
```

#### PointsToNextLevelResponse

```kotlin
data class PointsToNextLevelResponse(
    val pointsNeeded: Int             // 达到下一等级所需积分
)
```

### 会员权益相关DTO

> 注意：会员权益现在直接关联到会员系统，而不是会员等级。会员权益可以设置所需的等级顺序，以便只有达到特定等级或更高等级的用户才能获得该权益。

#### MembershipBenefitDTO

```kotlin
data class MembershipBenefitDTO(
    val id: Long?,                    // 会员权益ID
    val displayInfo: DisplayInfo,     // 显示信息
    val benefitType: BenefitType,     // 权益类型
    val membershipSystemId: Long?,    // 会员系统ID
    val requiredLevelOrder: Int = 0,  // 所需等级顺序
    val trigger: TriggerDTO? = null   // 触发器DTO
)
```

#### MembershipBenefitWithTriggerDTO

```kotlin
data class MembershipBenefitWithTriggerDTO(
    val id: Long?,                    // 会员权益ID
    val displayInfo: DisplayInfo,     // 显示信息
    val benefitType: BenefitType,     // 权益类型
    val membershipSystemId: Long?,    // 会员系统ID
    val requiredLevelOrder: Int = 0,  // 所需等级顺序
    val trigger: TriggerDTO?          // 触发器详情
)
```

#### BenefitType

```kotlin
enum class BenefitType {
    RULE_BASED,  // 基于规则的权益
    DESCRIPTIVE  // 描述性权益
}
```

#### RuleBasedBenefitRequest

```kotlin
data class RuleBasedBenefitRequest(
    val benefit: BenefitDTO,          // 权益信息
    val trigger: TriggerDTO           // 触发器信息
)
```

### 触发器相关DTO

#### TriggerDTO

```kotlin
data class TriggerDTO(
    val triggerType: TriggerType,       // 触发器类型
    val assetId: Long?,                 // 触发时分发的资产ID
    val maxTriggersPerUser: Int?,       // 每个用户最大触发次数，null表示无限制
    val triggerConfig: String = "{}"    // 触发器特定配置（JSON格式）
)
```

#### TriggerType

```kotlin
enum class TriggerType {
    WEEKLY,                      // 每周触发（特定星期几和时间）
    MONTHLY,                     // 每月触发（特定日期和时间）
    YEARLY,                      // 每年触发（特定月份、日期和时间）
    BIRTHDAY_MONTH,              // 生日月份触发
    WEEKLY_TIME_RANGE_WITH_ACTION, // 带操作的每周时间范围触发
    ORDER_COMPLETED,             // 订单完成触发
    LEVEL_REACHED,               // 等级达成触发
}
```

#### TriggerExecutionRequest

```kotlin
data class TriggerExecutionRequest(
    val userId: String                // 用户ID
)
```

#### TriggerProcessingResponse

```kotlin
data class TriggerProcessingResponse(
    val executedCount: Int            // 执行的触发器数量
)
```

### 用户会员相关DTO

#### UserMembershipDTO

```kotlin
data class UserMembershipDTO(
    val id: Long,                     // 用户会员ID
    val userId: String,               // 用户ID
    val membershipSystemId: Long,     // 会员系统ID
    val currentPoints: Int,           // 当前积分
    val currentLevelId: Long?,        // 当前等级ID
    val currentLevel: MembershipLevelDTO?, // 当前等级
    val isSubscribed: Boolean,        // 是否订阅
    val userTotalConsume: BigDecimal = BigDecimal.ZERO, // 用户总消费
    val userLastConsumeAt: LocalDateTime? = null, // 用户最后消费时间
)
```

#### UserMembershipDetailDTO

```kotlin
data class UserMembershipDetailDTO(
    val id: Long?,                    // 用户会员ID
    val userId: String,               // 用户ID
    val membershipSystemId: Long,     // 会员系统ID
    val currentPoints: Int,           // 当前积分
    val currentLevelId: Long?,        // 当前等级ID
    val currentLevel: MembershipLevelDTO?, // 当前等级
    val pointTransactions: List<PointTransactionDTO> = emptyList(), // 积分交易列表
    val membershipSystem: MembershipSystemDTO? = null, // 会员系统
    val userTotalConsume: BigDecimal = BigDecimal.ZERO, // 用户总消费
    val userLastConsumeAt: LocalDateTime? = null, // 用户最后消费时间
    val isSubscribed: Boolean = false, // 是否订阅
    val membershipLevels: List<MembershipLevelDTO> = emptyList(), // 会员等级列表
    val businessLayer: BusinessLayerResponseDTO
)
```

#### PointTransactionDTO

```kotlin
data class PointTransactionDTO(
    val id: Long?,                    // 积分交易ID
    val points: Int,                  // 积分数量
    val transactionType: PointTransactionType, // 交易类型
    val description: String,          // 描述
    val orderId: Long?,               // 订单ID
    val expirationDate: LocalDateTime?, // 过期日期
    val createTimestamp: LocalDateTime? // 创建时间
)
```

#### PointTransactionType

```kotlin
enum class PointTransactionType {
    EARN,    // 获得积分
    EXPIRE,  // 积分过期
    ADJUST   // 积分调整
}
```

#### AddPointsDTO

```kotlin
data class AddPointsDTO(
    val points: Int,                  // 积分数量
    val description: String,          // 描述
    val orderId: Long?,               // 订单ID
    val expirationDays: Int?          // 过期天数
)
```

#### JoinMembershipRequest

```kotlin
data class JoinMembershipRequest(
    val userId: String,               // 用户ID
    val blId: Long                    // 商户ID
)
```

#### BulkAddPointsRequest

```kotlin
data class BulkAddPointsRequest(
    val userIds: List<String>,        // 用户ID列表
    val blId: Long,                   // 商户ID
    val addPointsDTO: AddPointsDTO    // 添加积分DTO
)
```

#### EmailBLIdDTO

```kotlin
data class EmailBLIdDTO(
    val email: String,                // 邮箱
    val blId: Long,                   // 商户ID
    val displayName: String? = null   // 显示名称
)
```

#### AdjustPointsRequest

```kotlin
data class AdjustPointsRequest(
    val userId: String,               // 用户ID
    val blId: Long,                   // 商户ID
    val points: Int,                  // 积分数量
    val description: String           // 描述
)
```

### 资产配置详解

#### AssetConfig 详细说明

AssetConfig 是一个 JSON 字符串，根据不同的 AssetType 有不同的结构：

1. **VOUCHER（优惠券）**:
   ```json
   {
     "type": "VOUCHER",
     "maxLimit": 0,
     "usageMinAmount": 0,
     "maxDiscountAmount": 0,
     "discountStr": "",
     "productCodes": "",
     "activeSince": "2023-01-01T00:00:00",
     "expiredAt": null
   }
   ```

   字段说明：

    - `type`: 资产类型，固定为 VOUCHER
    - `maxLimit`: 最大使用限制
    - `usageMinAmount`: 最低使用金额
    - `maxDiscountAmount`: 最大折扣金额
    - `discountStr`: 折扣字符串
    - `productCodes`: 产品代码（可选）
    - `activeSince`: 生效时间
    - `expiredAt`: 过期时间

2. **POINT_EXCHANGE（积分兑换券）**:
   ```json
   {
     "type": "POINT_EXCHANGE",
     "point": 0
   }
   ```

   字段说明：
    - `type`: 资产类型，固定为 POINT_EXCHANGE
    - `point`: 所需积分

3. **PHYSICAL_REWARD（实物奖励）**:
   ```json
   {
     "type": "PHYSICAL_REWARD"
   }
   ```

   字段说明：
    - `type`: 资产类型，固定为 PHYSICAL_REWARD

#### TriggerConfig 详细说明

TriggerConfig 是一个 JSON 字符串，根据不同的 TriggerType 有不同的结构：

1. **WEEKLY（每周触发器）**:
   ```json
   {
     "type": "WEEKLY",
     "dayOfWeek": 1,
     "timeOfDay": "00:00"
   }
   ```

   字段说明：
    - `type`: 触发器类型，固定为 WEEKLY
    - `dayOfWeek`: 星期几（1-7，其中1表示星期一，7表示星期日）
    - `timeOfDay`: 一天中的时间，格式为 "HH:MM"

2. **MONTHLY（每月触发器）**:
   ```json
   {
     "type": "MONTHLY",
     "dayOfMonth": 1,
     "timeOfDay": "00:00"
   }
   ```

   字段说明：
    - `type`: 触发器类型，固定为 MONTHLY
    - `dayOfMonth`: 月中的第几天（1-31）
    - `timeOfDay`: 一天中的时间，格式为 "HH:MM"

3. **YEARLY（每年触发器）**:
   ```json
   {
     "type": "YEARLY",
     "month": 1,
     "day": 1,
     "timeOfDay": "00:00"
   }
   ```

   字段说明：
    - `type`: 触发器类型，固定为 YEARLY
    - `month`: 月份（1-12，其中1表示一月，12表示十二月）
    - `day`: 月中的第几天（1-31）
    - `timeOfDay`: 一天中的时间，格式为 "HH:MM"

4. **BIRTHDAY_MONTH（生日月触发器）**:
   ```json
   {
     "type": "BIRTHDAY_MONTH",
     "timeOfDay": "00:00"
   }
   ```

   字段说明：
    - `type`: 触发器类型，固定为 BIRTHDAY_MONTH
    - `timeOfDay`: 一天中的时间，格式为 "HH:MM"

5. **WEEKLY_TIME_RANGE_WITH_ACTION（每周时间范围内动作触发器）**:
   ```json
   {
     "type": "WEEKLY_TIME_RANGE_WITH_ACTION",
     "dayOfWeek": 1,
     "startTime": "00:00",
     "endTime": "23:59"
   }
   ```

   字段说明：
    - `type`: 触发器类型，固定为 WEEKLY_TIME_RANGE_WITH_ACTION
    - `dayOfWeek`: 星期几（1-7，其中1表示星期一，7表示星期日）
    - `startTime`: 开始时间，格式为 "HH:MM"
    - `endTime`: 结束时间，格式为 "HH:MM"

6. **ORDER_COMPLETED（订单完成触发器）**:
   ```json
   {
     "type": "ORDER_COMPLETED",
     "minimumSpend": 100.00,
     "specificProducts": "PROD001,PROD002",
     "cooldownDays": 7
   }
   ```

   字段说明：
    - `type`: 触发器类型，固定为 ORDER_COMPLETED
    - `minimumSpend`: 最低消费金额
    - `specificProducts`: 特定产品，逗号分隔的产品代码列表
    - `cooldownDays`: 冷却天数，防止频繁触发

7. **LEVEL_REACHED（等级达成触发器）**:
   ```json
   {
     "type": "LEVEL_REACHED",
     "targetLevelId": 2
   }
   ```

   字段说明：
    - `type`: 触发器类型，固定为 LEVEL_REACHED
    - `targetLevelId`: 目标等级ID

### 优惠券相关DTO

#### AssetDTO

```kotlin
data class AssetDTO(
    val id: Long?,                    // 资产ID
    val displayInfo: DisplayInfo,     // 显示信息
    val initialStock: Int,            // 初始库存
    val currentStock: Int,            // 当前库存
    val distributed: Int,             // 已分发数量
    val used: Int,                    // 已使用数量
    val expired: Int,                 // 已过期数量
    val activeSince: LocalDateTime,   // 生效时间
    val expiredAt: LocalDateTime?,    // 过期时间
    val claimDaysLimit: Int?,         // 领取天数限制
    val active: Boolean,              // 是否激活
    val assetType: AssetType,         // 资产类型
    val supportsRedemptionCode: Boolean, // 是否支持兑换码
    val redemptionCodePrefix: String?, // 兑换码前缀
    val assetConfig: String           // 资产配置
)
```

#### AssetType

```kotlin
enum class AssetType {
    VOUCHER,          // 优惠券
    POINT_EXCHANGE,   // 积分兑换券
    PHYSICAL_REWARD   // 实物奖励
}
```

#### AssetRecordDTO

```kotlin
data class AssetRecordDTO(
    val id: Long?,                    // 资产记录ID
    val userId: String,               // 用户ID
    val assetId: Long,                // 资产ID
    val assetInfo: AssetDTO?,         // 资产信息
    val redemptionCode: String?,      // 兑换码
    val shortcode: String,            // 短码
    val distributedAt: LocalDateTime, // 分发时间
    val distributedBy: String?,       // 分发者
    val distributionSource: String?,  // 分发来源
    val distributionNote: String?,    // 分发备注
    val expiresAt: LocalDateTime?,    // 过期时间
    val expiredAt: LocalDateTime?,    // 实际过期时间
    val status: AssetStatus,          // 状态
    val usedAt: LocalDateTime?,       // 使用时间
    val usedOrderId: Long?,           // 使用订单ID
    val usedDeviceId: Long?,          // 使用设备ID
    val useNote: String?,             // 使用备注
)
```

#### AssetStatus

```kotlin
enum class AssetStatus {
    DISTRIBUTED,  // 已分发
    USED,         // 已使用
    EXPIRED,      // 已过期
    REVOKED       // 已撤销
}
```

#### AssetRedemptionCodeDTO

```kotlin
data class AssetRedemptionCodeDTO(
    val id: Long?,                    // 资产兑换码ID
    val code: String,                 // 兑换码
    val assetId: Long?,               // 资产ID
    val assetRecordId: Long?,         // 资产记录ID
    val status: RedemptionCodeStatus, // 状态
    val createdAt: LocalDateTime,     // 创建时间
    val expiresAt: LocalDateTime?,    // 过期时间
    val redeemedAt: LocalDateTime?,   // 兑换时间
    val redeemedBy: String?,          // 兑换者
    val usageCount: Int,              // 使用次数
    val maxUsageCount: Int,           // 最大使用次数
    val batchId: String?              // 批次ID
)
```

#### RedemptionCodeStatus

```kotlin
enum class RedemptionCodeStatus {
    ACTIVE,    // 激活
    REDEEMED,  // 已兑换
    EXPIRED,   // 已过期
    REVOKED    // 已撤销
}
```

#### AssetDistributionRequest

```kotlin
data class AssetDistributionRequest(
    val userId: String,               // 用户ID
    val note: String? = null          // 备注
)
```

#### AssetUpdateDTO

```kotlin
data class AssetUpdateDTO(
    val displayInfo: DisplayInfo,     // 显示信息
    val active: Boolean,              // 是否激活
    val assetConfig: String           // 资产配置
)
```

#### InventoryAdjustmentRequest

```kotlin
data class InventoryAdjustmentRequest(
    val desiredInventory: Int         // 期望的库存数量
)
```

#### RedemptionCodeGenerationRequest

```kotlin
data class RedemptionCodeGenerationRequest(
    val count: Int,                   // 生成数量
    val expiresAt: LocalDateTime? = null, // 过期时间
    val batchId: String? = null,      // 批次ID
    val note: String? = null          // 备注
)
```

#### RedemptionCodeGenerationResponse

```kotlin
data class RedemptionCodeGenerationResponse(
    val batchId: String,              // 批次ID
    val count: Int,                   // 生成数量
    val generatedCodes: List<String>, // 生成的兑换码列表
    val expiresAt: LocalDateTime?     // 过期时间
)
```

#### AssetRedemptionRequest

```kotlin
data class AssetRedemptionRequest(
    val code: String,                 // 兑换码
    val userId: String                // 用户ID
)
```

#### RedemptionCodeRevocationRequest

```kotlin
data class RedemptionCodeRevocationRequest(
    val reason: String? = null        // 撤销原因
)
```

#### BatchRevocationResponse

```kotlin
data class BatchRevocationResponse(
    val revokedCount: Int             // 撤销数量
)
```

#### RedemptionCodeCreationRequest

```kotlin
data class RedemptionCodeCreationRequest(
    val code: String,                 // 兑换码
    val maxUsageCount: Int = 1,       // 最大使用次数
    val expiresAt: LocalDateTime? = null, // 过期时间
    val batchId: String? = null,      // 批次ID
    val note: String? = null          // 备注
)
```

#### CodeDuplicateCheckResponse

```kotlin
data class CodeDuplicateCheckResponse(
    val isDuplicate: Boolean          // 是否重复
)
```

#### AssetUsageRequest

```kotlin
data class AssetUsageRequest(
    val usedBy: String? = null,       // 使用者
    val orderId: Long? = null,        // 订单ID
    val deviceId: Long? = null,       // 设备ID
    val note: String? = null          // 备注
)
```

#### AssetRevocationRequest

```kotlin
data class AssetRevocationRequest(
    val revokedBy: String? = null,    // 撤销者
    val reason: String? = null        // 撤销原因
)
```

#### AssetRecordDetailDTO

```kotlin
data class AssetRecordDetailDTO(
    val assetRecord: AssetRecordDTO,  // 资产记录
    val blInfo: BusinessLayerResponseDTO // 商户信息
)
```

### 资产日志相关DTO

#### AssetLogDTO

```kotlin
data class AssetLogDTO(
    val id: Long?,                    // 日志ID
    val assetId: Long,                // 资产ID
    val userId: String?,              // 用户ID
    val action: AssetAction,          // 操作类型
    val details: String?,             // 详情
    val timestamp: LocalDateTime,     // 时间戳
    val assetRecordId: Long?          // 资产记录ID
)
```

#### AssetAction

```kotlin
enum class AssetAction {
    CREATED,                          // 创建
    DISTRIBUTED,                      // 分发
    USED,                             // 使用
    EXPIRED,                          // 过期
    REVOKED,                          // 撤销
    INVENTORY_ADJUSTED                // 库存调整
}
```

### 奖励相关DTO

#### AwardTypeDTO

```kotlin
data class AwardTypeDTO(
    val id: Long?,                    // 奖励类型ID
    val awardMax: BigDecimal,         // 奖励最大值
    val awardStart: BigDecimal,       // 奖励起始值
    val description: String,          // 描述
    val assetId: Long,                // 资产ID
    val blId: Long,                   // 商户ID
    val active: Boolean,              // 是否激活
    val repeatable: Boolean,          // 是否可重复
    val allowExcessAccumulation: Boolean, // 是否允许超额累积
    val minOrderAmount: BigDecimal,   // 最低订单金额
    val claimType: AwardClaimType,    // 奖励领取类型
    val pointClearAfterLastUsageDays: Int // 最后使用后积分清除天数
)
```

#### AwardClaimType

```kotlin
enum class AwardClaimType {
    OrderCount,                       // 订单数量
    OrderAmount,                      // 订单金额
}
```

#### AwardInfo

```kotlin
@Embeddable
open class AwardInfo(
    var awardMax: BigDecimal = BigDecimal.ZERO, // 奖励最大值
    var awardStart: BigDecimal = BigDecimal.ZERO, // 奖励起始值
    var description: String = "", // 描述
    var assetId: Long = 0, // 资产ID
    var minOrderAmount: BigDecimal = BigDecimal.ZERO, // 最低订单金额
    @Enumerated(EnumType.STRING)
    var claimType: AwardClaimType = AwardClaimType.OrderCount, // 奖励领取类型
    var pointClearAfterLastUsageDays: Int = 0, // 最后使用后积分清除天数
)
```

#### AwardProgressWithLogsDTO

```kotlin
data class AwardProgressWithLogsDTO(
    val awardProgress: AwardProgress, // 奖励进度
    val logs: List<AwardProgressLog>  // 奖励进度日志
)
```

#### AwardProgressStatus

```kotlin
enum class AwardProgressStatus {
    NotReady,                         // 未就绪
    Ready,                            // 就绪
    Used,                             // 已使用
}
```

#### AwardProgressResponseDTO

```kotlin
data class AwardProgressResponseDTO(
    val awardProgressList: List<AwardProgressWithAssetDTO>, // 奖励进度列表
    val relatedBusinessLayers: List<BusinessLayerResponseDTO> // 相关商户列表
)
```

#### AwardProgressWithAssetDTO

```kotlin
data class AwardProgressWithAssetDTO(
    val id: Long?,                    // 奖励进度ID
    val progress: BigDecimal,         // 进度
    val userId: String,               // 用户ID
    val awardTypeId: Long,            // 奖励类型ID
    val status: AwardProgressStatus,  // 状态
    val lastUpdateAt: LocalDateTime,  // 最后更新时间
    val awardInfo: AwardInfo,         // 奖励信息
    val assetInfo: AssetDTO?,         // 资产信息
    val blInfo: BusinessLayerResponseDTO // 商户信息
)
```

#### AwardProgressLog

```kotlin
class AwardProgressLog {
    var userId: String                // 用户ID
    var awardProgressId: Long         // 奖励进度ID
    var pointChange: BigDecimal       // 积分变化
    var logType: AwardProgressLogType // 日志类型
    var description: String           // 描述
    var timestamp: LocalDateTime      // 时间戳
    var orderId: Long?                // 订单ID
}
```

#### AwardProgressLogType

```kotlin
enum class AwardProgressLogType {
    ADD,                              // 添加
    SUBTRACT,                         // 减少
    EXPIRE,                           // 过期
}
```

### 商户相关DTO

> 注意：FrontendBusinessLayerDTO已被BusinessLayerResponseDTO替代，所有相关API都已更新。

#### BusinessLayerResponseDTO

```kotlin
data class BusinessLayerResponseDTO(
    var id: Long? = null,             // 商户ID
    var type: BLType,                 // 商户类型
    var contactInfo: ContactInfo,     // 联系信息
    var displayInfo: DisplayInfo,     // 显示信息
    var public: Boolean = true,       // 是否公开
    var parentId: Long? = null,       // 父商户ID
    var deviceId: Long? = null,       // 设备ID
    val childrenIds: List<Long> = listOf() // 子商户ID列表
)
```

#### FrontendBusinessLayerWithAwardProgressDTO

```kotlin
data class FrontendBusinessLayerWithAwardProgressDTO(
    val businessLayer: BusinessLayerResponseDTO, // 商户信息
    val awardProgress: List<AwardProgress> // 奖励进度列表
)
```

### 用户详情相关DTO

#### UserDetailDTO

```kotlin
data class UserDetailDTO(
    val userId: String,                // 用户ID
    val cloudUserInfo: CloudUser,      // 用户云信息
    val userMemberships: List<UserMembershipDTO>, // 会员资格列表
    val language: String,              // 语言
    val awardProgress: List<AwardProgressWithAssetDTO>, // 奖励进度列表
    val assetRecords: List<AssetRecordDTO> // 资产记录列表
)
```

#### UserBLDetailDTO

```kotlin
data class UserBLDetailDTO(
    val userId: String,                // 用户ID
    val cloudUserInfo: CloudUser,      // 用户云信息
    val currentMembership: UserMembershipDTO?, // 当前会员资格
    val awardProgress: List<AwardProgressWithAssetDTO>, // 奖励进度列表
    val assetRecords: List<AssetRecordDTO>, // 资产记录列表
    val pointTransactions: List<PointTransactionDTO> = emptyList(), // 积分交易列表
    val membershipSystem: MembershipSystemDTO? = null, // 会员系统
    val membershipLevels: List<MembershipLevelDTO> = emptyList(), // 会员等级列表
    val businessLayer: BusinessLayerResponseDTO? = null, // 商户信息
    val membershipBenefits: List<MembershipBenefitWithTriggerDTO> = emptyList() // 会员权益列表
)
```

#### UserBusinessLayerListDTO

```kotlin
data class UserBusinessLayerListDTO(
    val userId: String,                // 用户ID
    val cloudUserInfo: CloudUser,      // 用户云信息
    val currentMembership: UserMembershipDTO?, // 当前会员资格
)
```

## 1. 会员系统管理 (Membership System Management)

### 1.1 保存会员系统

- **接口**: POST /membership/system
- **参数**: MembershipSystemDTO
- **返回**: MembershipSystemDTO

### 1.2 获取会员系统

- **接口**: GET /membership/system/{id}
- **参数**: id (路径参数)
- **返回**: MembershipSystemDTO

### 1.3 获取商户的会员系统

- **接口**: GET /membership/system/bl/{blId}
- **参数**: blId (路径参数)
- **返回**: MembershipSystemDTO

## 2. 会员等级管理 (Membership Level Management)

### 2.1 创建会员等级

- **接口**: POST /api/membership-systems/{systemId}/levels
- **参数**:
    - systemId (路径参数): 会员系统ID
    - MembershipLevelDTO (请求体)
- **返回**: MembershipLevelDTO

### 2.2 更新会员等级

- **接口**: POST /api/membership-systems/{systemId}/levels/{id}
- **参数**:
    - systemId (路径参数): 会员系统ID
    - id (路径参数): 会员等级ID
    - MembershipLevelDTO (请求体)
- **返回**: MembershipLevelDTO

### 2.3 获取会员等级

- **接口**: GET /api/membership-systems/{systemId}/levels/{id}
- **参数**:
    - systemId (路径参数): 会员系统ID
    - id (路径参数): 会员等级ID
- **返回**: MembershipLevelDTO

### 2.4 获取会员系统的所有等级

- **接口**: GET /api/membership-systems/{systemId}/levels
- **参数**: systemId (路径参数): 会员系统ID
- **返回**: List<MembershipLevelDTO>

### 2.5 删除会员等级

- **接口**: POST /api/membership-systems/{systemId}/levels/{id}/delete
- **参数**:
    - systemId (路径参数): 会员系统ID
    - id (路径参数): 会员等级ID
- **返回**: 无内容

### 2.6 根据积分获取会员等级

- **接口**: GET /api/membership-systems/{systemId}/levels/by-points
- **参数**:
    - systemId (路径参数): 会员系统ID
    - points (查询参数): 积分数量
- **返回**: MembershipLevelDTO

### 2.7 计算达到下一等级所需积分

- **接口**: GET /api/membership-systems/{systemId}/levels/points-to-next-level
- **参数**:
    - systemId (路径参数): 会员系统ID
    - currentPoints (查询参数): 当前积分数量
- **返回**: PointsToNextLevelResponse

## 3. 会员系统权益管理 (Membership System Benefit Management)

### 3.1 创建会员系统权益

- **接口**: POST /membership-benefits
- **参数**:
    - MembershipBenefitDTO (请求体)
- **返回**: MembershipBenefitDTO

### 3.2 创建基于规则的会员系统权益

- **接口**: POST /membership-benefits/rule-based
- **参数**:
    - RuleBasedBenefitRequest (请求体)
- **返回**: MembershipBenefitDTO

### 3.3 更新会员系统权益

- **接口**: POST /membership-benefits/{id}
- **参数**:
    - id (路径参数): 会员系统权益ID
    - MembershipBenefitDTO (请求体)
- **返回**: MembershipBenefitDTO

### 3.4 获取会员系统权益

- **接口**: GET /membership-benefits/{id}
- **参数**:
    - id (路径参数): 会员系统权益ID
- **返回**: MembershipBenefitDTO

### 3.5 获取会员系统的所有权益

- **接口**: GET /membership-benefits/system/{membershipSystemId}
- **参数**: membershipSystemId (路径参数): 会员系统ID
- **返回**: List<MembershipBenefitWithTriggerDTO>

### 3.6 获取会员系统的特定等级权益

- **接口**: GET /membership-benefits/system/{membershipSystemId}/level/{userLevelOrder}
- **参数**:
    - membershipSystemId (路径参数): 会员系统ID
    - userLevelOrder (路径参数): 用户等级顺序
- **返回**: List<MembershipBenefitWithTriggerDTO>

### 3.7 删除会员系统权益

- **接口**: POST /membership-benefits/{id}/delete
- **参数**:
    - id (路径参数): 会员系统权益ID
- **返回**: 无内容

## 4. 触发器管理 (Trigger Management)

> 注意：触发器现在是会员权益的附属实体，不再有独立的CRUD接口。所有触发器相关功能现在通过会员权益接口访问。

## 5. 资产管理 (Asset Management)

### 5.1 创建资产

- **接口**: POST /api/assets
- **参数**: AssetDTO
- **返回**: AssetDTO

### 5.2 更新资产

- **接口**: POST /api/assets/{id}
- **参数**:
    - id (路径参数): 资产ID
    - AssetDTO (请求体)
- **返回**: AssetDTO

### 5.3 获取资产

- **接口**: GET /api/assets/{id}
- **参数**: id (路径参数): 资产ID
- **返回**: AssetDTO

### 5.4 获取所有资产

- **接口**: GET /api/assets
- **参数**:
    - assetType (查询参数, 可选): 资产类型
    - active (查询参数, 可选): 是否激活
    - pageable (分页参数)
- **返回**: Page<AssetDTO>

### 5.5 分发资产给用户

- **接口**: POST /api/assets/{assetId}/distribute
- **参数**:
    - assetId (路径参数): 资产ID
    - AssetDistributionRequest (请求体)
- **返回**: AssetRecordDTO

### 5.6 获取资产记录

- **接口**: GET /api/assets/{assetId}/records
- **参数**:
    - assetId (路径参数): 资产ID
    - status (查询参数, 可选): 资产状态
    - pageable (分页参数)
- **返回**: Page<AssetRecordDTO>

### 5.7 调整资产库存

- **接口**: POST /api/assets/{id}/adjust-inventory
- **参数**:
    - id (路径参数): 资产ID
    - InventoryAdjustmentRequest (请求体)
- **返回**: AssetDTO

### 5.8 删除资产

- **接口**: POST /api/assets/{id}/delete
- **参数**: id (路径参数): 资产ID
- **返回**: 无内容

### 5.9 获取商户的所有资产

- **接口**: GET /api/assets/bl/{blId}
- **参数**:
    - blId (路径参数): 商户ID
    - pageable (分页参数)
- **返回**: Page<AssetDTO>

### 5.10 获取资产记录详情

- **接口**: GET /api/asset-records/{recordId}/detail
- **参数**: recordId (路径参数): 资产记录ID
- **返回**: AssetRecordDetailDTO

## 6. 用户会员管理 (User Membership Management)

### 6.1 获取用户的所有会员资格

- **接口**: GET /membership/user/{userId}
- **参数**: userId (路径参数)
- **返回**: List<UserMembershipDTO>

### 6.2 获取用户在特定商户的会员资格

- **接口**: GET /membership/user/{userId}/bl/{blId}
- **参数**:
    - userId (路径参数)
    - blId (路径参数)
- **返回**: UserMembershipDetailDTO

### 6.3 获取用户会员的积分交易

- **接口**: GET /membership/user/{userId}/points
- **参数**:
    - userId (路径参数)
    - blId (查询参数)
    - pageable (分页参数)
- **返回**: Page<PointTransactionDTO>

### 6.4 加入会员系统

- **接口**: POST /membership/user/join
- **参数**: JoinMembershipRequest
- **返回**: 无内容 (状态码201表示新建会员资格，200表示已经是会员)

### 6.5 订阅商户会员系统

- **接口**: POST /membership/user/subscribe/{userId}/{blId}
- **参数**:
    - userId (路径参数)
    - blId (路径参数)
- **返回**: Boolean

### 6.6 取消订阅商户会员系统

- **接口**: POST /membership/user/unsubscribe/{userId}/{blId}
- **参数**:
    - userId (路径参数)
    - blId (路径参数)
- **返回**: 无内容

### 6.7 检查用户是否订阅了商户会员系统

- **接口**: GET /membership/user/isSubscribed/{userId}/{blId}
- **参数**:
    - userId (路径参数)
    - blId (路径参数)
- **返回**: Boolean

### 6.8 获取订阅商户会员系统的所有用户

- **接口**: GET /membership/user/subscribedUsers/{blId}
- **参数**: blId (路径参数)
- **返回**: List<UserMembershipDTO>

### 6.9 通过邮箱订阅商户会员系统

- **接口**: POST /membership/user/subscribeByEmail
- **参数**: EmailBLIdDTO
- **返回**: Boolean

### 6.10 调整用户积分

- **接口**: POST /membership/user/adjustPoints
- **参数**: AdjustPointsRequest
- **返回**: PointTransactionDTO

## 7. 资产记录管理 (Asset Record Management)

### 7.1 使用资产

- **接口**: POST /api/asset-records/{recordId}/use
- **参数**:
    - recordId (路径参数): 资产记录ID
    - AssetUsageRequest (请求体)
- **返回**: AssetRecordDTO

### 7.2 撤销资产记录

- **接口**: POST /api/asset-records/{recordId}/revoke
- **参数**:
    - recordId (路径参数): 资产记录ID
    - AssetRevocationRequest (请求体)
- **返回**: AssetRecordDTO

### 7.3 获取用户的资产记录

- **接口**: GET /api/asset-records/user/{userId}
- **参数**:
    - userId (路径参数): 用户ID
    - assetType (查询参数, 可选): 资产类型
    - status (查询参数, 可选): 资产状态
    - pageable (分页参数)
- **返回**: Page<AssetRecordDetailDTO> (包含资产记录和商户层信息)

### 7.4 通过短码查找资产记录

- **接口**: GET /api/asset-records/shortcode/{shortcode}
- **参数**:
    - shortcode (路径参数): 资产记录短码
- **返回**: AssetRecordDTO

### 7.5 获取商户的所有资产记录

- **接口**: GET /api/asset-records/business-layer/{blId}
- **参数**:
    - blId (路径参数): 商户ID
    - assetType (查询参数, 可选): 资产类型
    - status (查询参数, 可选): 资产状态
- **返回**: List<AssetRecordDTO>

## 8. 资产兑换码管理 (Asset Redemption Management)

### 8.1 创建或生成资产兑换码

- **接口**: POST /api/assets/{assetId}/redemption-codes
- **参数**:
    - assetId (路径参数): 资产ID
    - RedemptionCodeRequest (请求体):
        - 当提供 `code` 参数时，创建单个指定的兑换码
        - 当提供 `count` 参数时，生成多个兑换码
- **返回**:
    - 当创建单个兑换码时: AssetRedemptionCodeDTO
    - 当生成多个兑换码时: RedemptionCodeGenerationResponse

### 8.2 检查兑换码是否重复

- **接口**: GET /api/redemption-codes/check
- **参数**:
    - code (查询参数): 兑换码
- **返回**: CodeDuplicateCheckResponse

### 8.3 获取资产兑换码

- **接口**: GET /api/assets/{assetId}/redemption-codes
- **参数**:
    - assetId (路径参数): 资产ID
    - status (查询参数, 可选): 兑换码状态
    - batchId (查询参数, 可选): 批次ID
    - pageable (分页参数)
- **返回**: Page<AssetRedemptionCodeDTO>

### 8.4 获取资产兑换码批次

- **接口**: GET /api/assets/{assetId}/redemption-code-batches
- **参数**:
    - assetId (路径参数): 资产ID
    - pageable (分页参数)
- **返回**: Page<RedemptionCodeBatchSummaryDTO>

### 8.5 获取商户的所有兑换码

- **接口**: GET /api/redemption-codes/bl/{blId}
- **参数**:
    - blId (路径参数): 商户ID
- **返回**: List<AssetRedemptionCodeDTO>

### 8.6 兑换资产

- **接口**: POST /api/redemption-codes/redeem
- **参数**:
    - AssetRedemptionRequest (请求体)
- **返回**: AssetRecordDTO

### 8.7 撤销兑换码

- **接口**: POST /api/redemption-codes/{code}/revoke
- **参数**:
    - code (路径参数): 兑换码
    - RedemptionCodeRevocationRequest (请求体)
- **返回**: AssetRedemptionCodeDTO

### 8.8 撤销兑换码批次

- **接口**: POST /api/redemption-code-batches/{batchId}/revoke
- **参数**:
    - batchId (路径参数): 批次ID
    - RedemptionCodeRevocationRequest (请求体)
- **返回**: BatchRevocationResponse

## 9. 奖励管理 (Award Management)

### 9.1 保存奖励类型

- **接口**: POST /membership/award/save
- **参数**: AwardTypeDTO
- **返回**: AwardTypeDTO

### 9.2 删除奖励类型

- **接口**: POST /membership/award/delete/{id}
- **参数**: id (路径参数)
- **返回**: 无内容

### 9.3 获取所有奖励类型

- **接口**: GET /membership/award/all
- **参数**: 无
- **返回**: List<AwardTypeDTO>

### 9.4 获取商户的奖励类型

- **接口**: GET /membership/award/byBlId/{blId}
- **参数**: blId (路径参数)
- **返回**: List<AwardTypeDTO>

### 9.5 获取商户的奖励进度

- **接口**: GET /membership/award/progress/blId/{blId}
- **参数**: blId (路径参数)
- **返回**: List<AwardProgress>

### 9.6 获取用户的奖励进度

- **接口**: GET /membership/award/progress/byUserId/{userId}
- **参数**: userId (路径参数)
- **返回**: List<AwardProgress>

### 9.7 获取奖励进度和日志

- **接口**: GET /membership/award/progress/{awardProgressId}
- **参数**: awardProgressId (路径参数)
- **返回**: AwardProgressWithLogsDTO

### 9.8 领取奖励

- **接口**: POST /membership/award/claim/{userId}/{awardProgressId}
- **参数**:
    - userId (路径参数)
    - awardProgressId (路径参数)
- **返回**: AssetRecordDTO

### 9.9 获取用户的奖励进度和优惠券详情

- **接口**: GET /membership/award/user-award-progress/{userId}
- **参数**: userId (路径参数)
- **返回**: AwardProgressResponseDTO

### 9.10 获取用户和设备的奖励进度

- **接口**: GET /membership/award/user/{userId}/device/{deviceId}
- **参数**:
    - userId (路径参数)
    - deviceId (路径参数)
- **返回**: AwardProgressResponseDTO

### 9.11 获取带奖励进度的商户信息

- **接口**: GET /membership/award/bl/{blId}
- **参数**:
    - blId (路径参数)
    - userId (查询参数)
- **返回**: FrontendBusinessLayerWithAwardProgressDTO

## 10. 资产日志管理 (Asset Log Management)

### 10.1 获取资产日志

- **接口**: GET /api/assets/{assetId}/logs
- **参数**:
    - assetId (路径参数): 资产ID
    - action (查询参数, 可选): 操作类型
    - startTime (查询参数, 可选): 开始时间
    - endTime (查询参数, 可选): 结束时间
    - pageable (分页参数)
- **返回**: Page<AssetLogDTO>

### 10.2 获取用户资产日志

- **接口**: GET /api/users/{userId}/asset-logs
- **参数**:
    - userId (路径参数): 用户ID
    - assetType (查询参数, 可选): 资产类型
    - action (查询参数, 可选): 操作类型
    - startTime (查询参数, 可选): 开始时间
    - endTime (查询参数, 可选): 结束时间
    - pageable (分页参数)
- **返回**: Page<AssetLogDTO>

## 11. 用户详情管理 (User Detail Management)

> 注意：用户详情API已经合并到用户会员控制器中，路径已更新。

### 11.1 获取用户详情

- **接口**: GET /users/{userId}/details
- **参数**:
    - userId (路径参数): 用户ID
- **返回**: UserDetailDTO

### 11.2 获取用户在特定商家的详情

- **接口**: GET /users/{userId}/business-layers/{blId}/details
- **参数**:
    - userId (路径参数): 用户ID
    - blId (路径参数): 商家ID
- **返回**: UserBLDetailDTO
- **返回说明**:
    - 返回的UserBLDetailDTO现在包含membershipBenefits字段，包含用户可用的所有会员权益
    - businessLayer字段现在使用BusinessLayerResponseDTO类型，替代了之前的FrontendBusinessLayerDTO

### 11.3 获取持有特定商家会员身份的所有用户列表

- **接口**: GET /business-layers/{blId}/members
- **参数**:
    - blId (路径参数): 商家ID
- **返回**: List<UserBusinessLayerListDTO>
