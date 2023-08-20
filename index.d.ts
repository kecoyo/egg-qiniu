import * as qiniu from 'qiniu';

declare module 'egg' {
  type QiniuClientOption = {
    zone: 'Zone_z0' | 'Zone_z1' | 'Zone_z2' | 'Zone_na0'; // Zone_z0 华东, Zone_z1 华北, Zone_z2 华南, Zone_na0 北美
    bucket: string;
    baseUrl: string; // 用于拼接已上传文件的完整地址
  };

  type Qiniu = {
    /**
     * 生成上传 token, 前端可以使用
     * @param {string} key 目标文件名
     * @return {Object}
     */
    generateUploadTokenData(key: string): any;

    /**
     * 文件上传
     * @param {string} key 目标文件名
     * @param {string} file 本地文件路径
     * @return {Object}
     */
    uploadFile(key: string, file: string): Promise<any>;

    /**
     * 字节上传
     * @param {string} key 目标文件名
     * @param {any} bytes
     * @return {Object}
     */
    uploadBytes(key: string, bytes: any): Promise<any>;

    /**
     * 数据流上传
     * @param {string} key 目标文件名
     * @param {NodeJS.ReadableStream} stream 数据流
     * @return {Object}
     */
    uploadStream(key: string, stream: NodeJS.ReadableStream): Promise<any>;

    /**
     * 获取文件信息
     * @param {string} key 空间中的文件名
     * @return {Object}
     */
    fileInfo(key: string): Promise<any>;

    /**
     * 修改文件存储类型
     * @param {string} key 空间中的文件名
     * @param {number} newType 0 普通存储, 1 低频存储
     * @return {Object}
     */
    changeType(key: string, newType: number): Promise<any>;

    /**
     * 移动或者重命名文件
     * @param {string} srcKey 源文件名称
     * @param {string} destBucket 目标空间名称
     * @param {string} destKey 目标文件名称
     * @param {boolean} isForce true: 强制覆盖已有同名文件
     * @return {Object}
     */
    move(srcKey: string, destBucket: string, destKey: string, isForce: boolean): Promise<any>;

    /**
     * 复制文件
     * @param {string} srcKey 源文件名称
     * @param {string} destBucket 目标空间名称
     * @param {string} destKey 目标文件名称
     * @param {boolean} isForce true: 强制覆盖已有同名文件
     * @return {Object}
     */
    copy(srcKey: string, destBucket: string, destKey: string, isForce: boolean): Promise<any>;

    /**
     * 删除文件
     * @param {string} key 空间中的文件名
     * @return {Object}
     */
    delete(key): Promise<any>;

    /**
     * 设置或更新文件的生存时间
     * @param {string} key 空间中的文件名称
     * @param {number} days 有效期天数
     * @return {Object}
     */
    deleteAfterDays(key: string, days: number): Promise<any>;

    /**
     * 获取指定前缀的文件列表
     * @param {*} param0
     * @property {string} prefix 列举的文件前缀，
     * @property {string} marker 上一次列举返回的
     * @property {number} limit 每次返回的最大列举
     * @property {string} delimiter 指定目录分隔符
     * @return {object}
     */
    listPrefix(options: qiniu.rs.ListPrefixOptions): Promise<any>;

    /**
     * 抓取网络资源到空间
     * @param {string} url 资源链接
     * @param {string} key 存放到空间时的文件名称
     * @return {Object}
     */
    fetch(url: string, key: string): Promise<any>;

    /**
     * 批量获取文件信息
     * 数量不可以超过1000个，如果总数量超过1000，需要分批发送
     * @param {Array<string>} files 文件名称集合, ['a1.txt', 'a2.txt', ...]
     * @return {Object}
     */
    batchFileInfo(files: string[]): Promise<any>;

    /**
     * 批量删除文件
     * 数量不可以超过1000个，如果总数量超过1000，需要分批发送
     * @param {Array<string>} files 文件名称集合, ['a1.txt', 'a2.txt', ...]
     * @return {Array}:
     */
    batchDelete(files: string[]): Promise<any>;

    /**
     * CDN 文件刷新
     * 单次请求链接不可以超过100个，如果超过，请分批发送请求
     * @param {Array<string>} urls 待刷新的 url集合
     * @return {Object}
     */
    refreshUrls(urls: string[]): Promise<any>;

    /**
     * CDN 目录刷新
     * 刷新目录需要联系七牛技术支持开通权限
     * 单次请求链接不可以超过10个，如果超过，请分批发送请求
     * @param {Array<string>} dirs 待刷新的 目录集合
     * @return {Object}
     */
    refreshDirs(dirs: string[]): Promise<any>;

    /**
     * CDN 文件预取
     * 单次请求链接不可以超过100个，如果超过，请分批发送请求
     * @param {Array<string>} urls 待刷新的 url集合
     * @return {Object}
     */
    prefetchUrls(urls: string[]): Promise<any>;

    /**
     * CDN 获取指定域名流量
     * @param {string} startDate 起始日期 2018-01-01
     * @param {string} endDate 结束日期 2018-01-02
     * @param {Array<string>} domains 待查询的域名集合
     * @return {Object}
     */
    getFluxData(startDate: string, endDate: string, domains: string[]): Promise<any>;

    /**
     * CDN 获取指定域名带宽
     * @param {string} startDate 起始日期 2018-01-01
     * @param {string} endDate 结束日期 2018-01-02
     * @param {Array<string>} domains 待查询的域名集合
     * @return {Object}
     */
    getBandwidthData(startDate: string, endDate: string, domains: string[]): Promise<any>;

    /**
     * CDN 获取日志下载链接
     * @param {string} logDay 查询日期 2018-01-01
     * @param {Array<string>} domains 待查询的域名集合
     * @return {Object}
     */
    getCdnLogList(logDay: string, domains: string[]): Promise<any>;
  };

  // extend app
  interface Application {
    qiniu: Qiniu;
  }

  // extend your config
  interface EggAppConfig {
    qiniu: {
      default: {
        ak: string; // Access Key
        sk: string; // Secret Key
        useCdnDomain?: boolean;
        isLog?: boolean;
      };
      app?: boolean;
      agent?: boolean;

      // 单实例
      // 通过 app.qiniu 直接使用实例
      client?: QiniuClientOption;

      // 多实例
      clients?: {
        [key: string]: QiniuClientOption;
      };
    };
  }
}
