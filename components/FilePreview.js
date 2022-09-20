import Image from "next/image.js";
import React, { useState } from "react";
import styles from "../styles/FilePreview.module.css";

const FilePreview = ({ fileData }) => {

  // console.log('xxx', {
  //   fileData
  // });
  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>


        {/* loop over the fileData */}
        {fileData.fileList.map((f) => {
          return (
            <div key={`${f.name}${f.lastModified}`}>
              {
                fileData &&
                <Image src={URL.createObjectURL(f)} alt="upload" height={50} width={50} />
              }
              <ol>
                <li className={styles.fileList}>
                  {/* display the filename and type */}
                  <div className={styles.fileName}>
                    {f.name}
                  </div>
                </li>
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;