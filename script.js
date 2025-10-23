:root{
  --bg:#fafafa; --card:#fff; --accent:#b3412c; --text:#222;
  --muted:#666; --radius:12px;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);line-height:1.4}
.site-header{
  display:flex;align-items:center;justify-content:space-between;padding:18px 20px;background:linear-gradient(90deg,#fff,#fff);
  border-bottom:1px solid #eee;
}
.brand h1{margin:0;font-size:1.25rem}
.subtitle{margin:4px 0 0;font-size:0.85rem;color:var(--muted)}
.qr-block{text-align:center}
#qrcode{width:120px;height:120px;margin:6px auto}
#downloadQrBtn{margin-top:6px;padding:6px 8px;border-radius:8px;border:1px solid #ddd;background:#fff;cursor:pointer}

.container{max-width:1100px;margin:22px auto;padding:0 16px}
.controls{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.controls input[type="search"]{
  flex:1;min-width:200px;padding:10px;border-radius:10px;border:1px solid #ddd;background:white;
}
.controls select{padding:10px;border-radius:10px;border:1px solid #ddd;background:white}

.menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
.card{
  background:var(--card);border-radius:var(--radius);padding:12px;border:1px solid #eee;
  display:flex;flex-direction:column;gap:8px;box-shadow:0 2px 6px rgba(0,0,0,0.03);
}
.card img{width:100%;height:140px;object-fit:cover;border-radius:8px}
.card h3{margin:0;font-size:1rem}
.card p{margin:0;color:var(--muted);font-size:0.95rem}
.card .meta{display:flex;justify-content:space-between;align-items:center;margin-top:8px}
.btn{
  padding:8px 10px;border-radius:8px;border:none;background:var(--accent);color:white;text-decoration:none;cursor:pointer;
}

.site-footer{text-align:center;padding:16px;color:var(--muted)}

.modal{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;padding:20px}
.modal.hidden{display:none}
.modal-content{background:white;padding:18px;border-radius:12px;max-width:520px;width:100%;position:relative}
.modal-content img{width:100%;height:220px;object-fit:cover;border-radius:8px;margin-bottom:12px}
.modal-content .close{position:absolute;top:10px;right:10px;border:none;background:transparent;font-size:22px;cursor:pointer}
.order-btn{display:inline-block;margin-top:8px;padding:10px 12px;border-radius:10px;background:#0b7b3b;color:white;text-decoration:none}
@media (max-width:520px){
  .site-header{flex-direction:column;gap:12px;align-items:flex-start}
  #qrcode{width:100px;height:100px}
}
