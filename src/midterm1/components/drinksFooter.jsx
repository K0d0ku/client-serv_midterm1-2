import '../pages/midterm1bahandiburger.css';
export default function DrinksFooter () {
return(
    <>{/*так как в фигме у двух страниц были футеры разного цвета я просто*/}
    <footer class="footer-drin">{/*дал разное имя каждому компонентному футеру*/}
        <div class="logo-wrapper"><div class="logo-2">BAHANDI</div></div>
        <p class="p">© 2024 ТОО Баханди. Все права защищены</p>
        <div class="group-9">
          <div class="text-wrapper-8">Компания</div>
          <div class="text-wrapper-9">Франшиза</div>
          <div class="text-wrapper-10">Вакансии</div>
          <div class="text-wrapper-10">Оферета</div>
          <div class="text-wrapper-10">Политика конфиденциальности</div>
          <div class="text-wrapper-10">Карта сайта</div>
        </div>
      </footer>
    </>
)
}