import { useEffect, useState } from "react";
import { api, API_BASE, errMessage } from "../api/client.js";
import { Empty, Header, PageLoading } from "./Dashboard.jsx";

function imageUrl(url) {
  if (/^https?:\/\//.test(url)) return url;
  return url.startsWith("/") ? `${API_BASE}${url}` : `${API_BASE}/${url}`;
}

export default function Gallery() {
  const [images, setImages] = useState(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const load = async () => {
    try {
      const { data } = await api.get("/api/gallery");
      setImages(data.images);
      setError("");
    } catch (err) {
      setError(errMessage(err, "Could not load the gallery."));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setError("");
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("title", title);
      await api.post("/api/gallery", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setFile(null);
      e.target.reset();
      await load();
    } catch (err) {
      setError(errMessage(err, "Could not upload the image."));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (image) => {
    if (!window.confirm("Remove this image from the gallery?")) return;
    setBusy(image._id);
    try {
      await api.delete(`/api/gallery/${image._id}`);
      await load();
    } catch (err) {
      setError(errMessage(err, "Could not delete the image."));
    } finally {
      setBusy("");
    }
  };

  if (!images) return <PageLoading />;

  return (
    <div>
      <Header
        title="Gallery"
        subtitle="Images shown on the main gallery page."
        actions={
          <button className="btn btn-ghost" onClick={load} type="button">
            Refresh
          </button>
        }
      />

      {error && <div className="alert alert-error">{error}</div>}

      <section className="card">
        <h2>Upload image</h2>
        <form className="upload-form" onSubmit={upload}>
          <label className="field">
            <span>Title (optional)</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Studio Session"
            />
          </label>
          <label className="field">
            <span>Image (JPG, PNG, WEBP, GIF — max 10MB)</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
            />
          </label>
          <button className="btn btn-primary" type="submit" disabled={saving || !file}>
            {saving ? "Uploading…" : "Upload"}
          </button>
        </form>
      </section>

      {images.length === 0 ? (
        <section className="card">
          <Empty text="No images yet. Upload the first one above." />
        </section>
      ) : (
        <div className="gallery-grid">
          {images.map((image) => (
            <figure key={image._id} className="gallery-card">
              <img src={imageUrl(image.url)} alt={image.title || "Gallery image"} />
              <figcaption>
                <span>{image.title || "Untitled"}</span>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  disabled={busy === image._id}
                  onClick={() => remove(image)}
                >
                  Remove
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}