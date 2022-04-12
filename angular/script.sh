for file in *.css
do
  mv "$file" "${file%.css}.scss"
done