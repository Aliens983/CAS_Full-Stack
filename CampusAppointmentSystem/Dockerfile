# ============================================================
# 后端 Dockerfile — 多阶段构建
# 阶段1: Maven 编译
# 阶段2: 运行时（复用同一基础镜像，避免额外拉取）
#
# 设计说明:
#   eclipse-temurin 镜像在国内镜像站经常缺失，
#   但 maven:3.9-eclipse-temurin-17 可用且内置 JDK 17。
#   两个阶段使用同一基础镜像，Docker 只拉一次。
# ============================================================

# --- 共享基础镜像 ---
FROM maven:3.9-eclipse-temurin-17 AS base
# 预置时间，子阶段继承
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# --- 构建阶段 ---
FROM base AS builder
WORKDIR /build

# 1. POM（利用 Docker 缓存）
COPY pom.xml ./
COPY cas-dependencies/pom.xml ./cas-dependencies/
COPY cas-framework/pom.xml ./cas-framework/
COPY cas-framework/cas-common/pom.xml ./cas-framework/cas-common/
COPY cas-framework/cas-spring-boot-starter-web/pom.xml ./cas-framework/cas-spring-boot-starter-web/
COPY cas-framework/cas-spring-boot-starter-security/pom.xml ./cas-framework/cas-spring-boot-starter-security/
COPY cas-framework/cas-spring-boot-starter-mybatis/pom.xml ./cas-framework/cas-spring-boot-starter-mybatis/
COPY cas-framework/cas-spring-boot-starter-redis/pom.xml ./cas-framework/cas-spring-boot-starter-redis/
COPY cas-framework/cas-spring-boot-starter-mq/pom.xml ./cas-framework/cas-spring-boot-starter-mq/
COPY cas-framework/cas-spring-boot-starter-test/pom.xml ./cas-framework/cas-spring-boot-starter-test/
COPY cas-module-infra/pom.xml ./cas-module-infra/
COPY cas-module-system/pom.xml ./cas-module-system/
COPY cas-module-appointment/pom.xml ./cas-module-appointment/
COPY cas-thirdparty/pom.xml ./cas-thirdparty/
COPY cas-server/pom.xml ./cas-server/

# 2. 下载依赖
RUN mvn dependency:go-offline -B -DskipTests

# 3. 源码
COPY cas-framework/ ./cas-framework/
COPY cas-module-infra/ ./cas-module-infra/
COPY cas-module-system/ ./cas-module-system/
COPY cas-module-appointment/ ./cas-module-appointment/
COPY cas-thirdparty/ ./cas-thirdparty/
COPY cas-server/ ./cas-server/

# 4. 编译
RUN mvn clean package -DskipTests -B

# --- 运行阶段 ---
FROM base AS runtime
WORKDIR /app

COPY --from=builder /build/cas-server/target/cas-server-*.jar app.jar
RUN mkdir -p /app/uploads

EXPOSE 18080

# JVM 可通过 JAVA_OPTS 环境变量调整
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS:--Xms256m -Xmx512m} -jar app.jar"]
