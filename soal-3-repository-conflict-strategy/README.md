# **Strategi Perbaikan Issue di Production Tanpa Konflik dengan QA & Development**

## **1. Buat Hotfix Branch dari Production**  

```bash
git checkout production
git pull origin production  # Pastikan branch production up-to-date
git checkout -b hotfix/issue-fix
```

## **2. Perbaiki Issue, Commit dan Push Perubahan**
Lakukan perbaikan kode, lalu commit dan push perubahan:
```
git add .
git commit -m "Fix critical issue on production"
git push origin hotfix/issue-fix
```

## **3. Merge Hotfix ke Production**
Setelah dites dan dipastikan perbaikan benar, merge ke Production dan deploy:
```
git checkout production
git merge hotfix/issue-fix
git push origin production
```

## **4. Merge Hotfix ke QA dan Development untuk Mencegah Konflik**
Agar QA dan Development tetap up-to-date, merge perubahan dari Production ke kedua branch tersebut.

a) Merge ke QA
```
git checkout qa
git pull origin qa
git merge production
git push origin qa
```

b) Merge ke Development
```
git checkout development
git pull origin development
git merge production  # Mengambil perbaikan dari production
git push origin development
```

## **5. Hapus Hotfix Branch**
Jika tidak diperlukan lagi, hapus branch hotfix setelah semuanya sudah diintegrasikan:
```
git branch -d hotfix/issue-fix
git push origin --delete hotfix/issue-fix
```