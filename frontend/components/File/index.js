import axios from "axios"
import Router from "next/router"
import { FiDownload, FiEye, FiEyeOff, FiFolder, FiTrash } from "react-icons/fi"
import canViewFile from "../../functions/canViewFile"
import parseTime from "../../functions/parseTime"
import Button from "../Button"

const File = ({ id, loid, path, uploaded_at, name, file_type, size, slug, onChange }) => {
  const sizeInMb = size.Int32 / 1000000

  const download = async () => {
    const resp = await axios.get(`http://localhost:8080/download/${id.Int32}`, { responseType: 'blob', withCredentials: true })
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name.String);
    document.body.appendChild(link);
    link.click();
  }

  const deleteFile = async () => {
    await axios.delete(`http://localhost:8080/files/${id.Int32}`, { withCredentials: true })
    onChange()
  }

  const deleteFolder = async () => {
    await axios.delete(`http://localhost:8080/folders/${id.Int32}`, { withCredentials: true })
    onChange()
  }

  return (
    <div className="border-2 h-40 w-72 rounded-lg grid"
      style={{
        gridTemplateColumns: '3fr 1fr'
      }}
    >
      <div className="h-full p-3">
        {file_type.String !== "folder" && (
          <div className="h-full">
            <p className="text-sm font-bold h-3/4">
              {name.String}
            </p>
            <div>
              <p className="text-xs">
                Size: {sizeInMb.toFixed(2)} MB
              </p>
              <p className="text-xs">Uploaded:
                {parseTime(uploaded_at.Time)}
              </p>
            </div>
          </div>
        )}
        {file_type.String === "folder" && (
          <div className="grid h-full place-items-center cursor-pointer" onClick={() => {
            Router.push(`/files${path.String}${name.String}`)
          }}>
            <FiFolder style={{ fontSize: '70px' }} />
            <p className="text-sm font-bold">{name.String}</p>
          </div>
        )}
      </div>
      <div className="bg-neutral-200 rounded-r-md grid grid-cols-1 text-center pt-3 place-content-center gap-5">
        <Button OnClick={download} Icon={FiDownload} />
        {file_type.String === "folder" && (
          <Button OnClick={deleteFolder} Icon={FiTrash} />
        )}
        {file_type.String !== "folder" && (
          <Button OnClick={deleteFile} Icon={FiTrash} />
        )}
        {canViewFile(file_type.String) && (
          <Button OnClick={() => window.open(`/view/${id.Int32}`, '_blank')} Icon={FiEye} />
        )}
      </div>

    </div>
  )
}

export default File