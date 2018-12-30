/*

@Service
public class AdminService {


  @Autowired
  private FuncDao fdao;
  @Autowired
  private FuncLogDao funcLogDao;




  @Autowired
  private Avas_maniDAO avas_maniDAO;
  @Autowired
  private Avas_indDAO avas_indDAO;




  public Funcionario funcionarioAuth(/* @ModelAttribute("usuario") Usuario usuario */) {
     //  Funcionario func = fdao.findById(usuario.getChave().toUpperCase());
     /*
      Funcionario func = fdao.findById("F0436762");



      if (func.getPapelcont() != null ) {
          funcLogDao.Logfunc(func, "logou inicial - autorizado", (long) 0);
        }else {
          funcLogDao.Logfunc(func, "logou inicial - sem autorizacao", (long) 0 );
        }
    return func ;
  }



  public void logQuestionario(Funcionario funcionario, String questionario, int id_ava,  Long ocorrencia) {

        FuncLog funclog = new FuncLog();

      Calendar myCal = Calendar.getInstance();
      funclog.setData_acesso(myCal.getInstance());

      funclog.setAutorizacao(Integer.toString(funcionario.getAutorizacao()));
      funclog.setCd_usu(funcionario.getMatricula());
      funclog.setNm_fun(funcionario.getNm_fun());
      funclog.setCd_cmss_fun(funcionario.getCd_cmss_fun());
      funclog.setTx_cmss_fun(funcionario.getTx_cmss_fun());
      funclog.setCd_depe_lclz(funcionario.getCd_depe_lclz());
      funclog.setPrefixo_origem(funcionario.getPrefixo_origem());
      funclog.setId_ava(id_ava);
      funclog.setOcorrencia(ocorrencia);
      funclog.setPapelcont(funcionario.getPapelcont());

    funcLogDao.LogVisualizacaoQuestionario(funclog);
  }








   public List<FuncLog> funclog(String prefixo){
       return funcLogDao.logAgencia(Integer.parseInt(prefixo));
   }

   public AuthEspecial authEspecial( AuthEspecial authEspecial) {

     Funcionario funcionario = fdao.findById(authEspecial.getCd_usu());

     /* prazo igual a null EXCLUI AUTORIZAO */
  /*
     if (authEspecial.getDias_prazo() != null ) {

          /* PRAZO IGUAL 0 TRATA-SE DE SIMULAO PARA O PRPRIO FUNCIONRIO - MANTEM AS INFORMAES INICIAIS da auth especial
           * altera prefixo funcionario
           * Rotina SAS faz revalidacao diária das autorizacoes especiais
           */
    /*
         if (authEspecial.getDias_prazo() == 0 ) {

           funcionario.setCd_depe_lclz(authEspecial.getPrefixo_auth());

           authEspecial.setDias_prazo(funcionario.getAuthEspecial().getDias_prazo());
           authEspecial.setDt_prazo_auth(funcionario.getAuthEspecial().getDt_prazo_auth());
           authEspecial.setDt_auth(funcionario.getAuthEspecial().getDt_auth());
           authEspecial.setCd_usu_grav_auth(funcionario.getAuthEspecial().getCd_usu_grav_auth());
           authEspecial.setNm_aud_auth(funcionario.getAuthEspecial().getNm_aud_auth());

         } else {
           System.out.println(" inclui autorizao " + authEspecial.getPapelcont());
           funcionario.setAutorizacao(1);
           funcionario.setPapelcont(authEspecial.getPapelcont());
           LocalDate data = LocalDate.now();
           authEspecial.setDt_auth(data);
           authEspecial.setDt_prazo_auth(data.plusDays(authEspecial.getDias_prazo()));

         }

         fdao.authFuncionario(funcionario);
         fdao.authEspecial(authEspecial);

    /* exclui funcionario */
    /*
     }else {
       System.out.println(" = null ");
       funcionario.setAutorizacao(0);
       funcionario.setPapelcont(null);
       fdao.authFuncionario(funcionario);
       fdao.removerAuthEspecial(authEspecial);
     }


     return authEspecial;

   }

   public List<Funcionario> FuncisContinua(String nm_fun) {
     return fdao.FuncisContinua(nm_fun);
   }


   public List<Avas_manifestacoes> avas_manifestacoes(String id_ava){
      return avas_maniDAO.avas_manifestacoes(Integer.parseInt(id_ava));
   }

   public List<Avas_manifestacoes> avas_manifestacoesAge(int cd_depe_lclz){
      return avas_maniDAO.avas_manifestacoesAge(cd_depe_lclz);
   }

   public List<Avas_manifestacoes_age> avas_maniAge(int cd_depe_lclz){
      return avas_maniDAO.avas_maniAge(cd_depe_lclz);
   }

   public List<Avas_continua> avas_continua(){
      return avas_maniDAO.avas_maniContinua();
   }


   /* manutencao indicadores */
   /*
   public List<Avas_ind> indicador_avas(){
     return avas_indDAO.findAll();
   }

 public Avas_ind manutencaoInd(Avas_ind avas_ind) {

     if (avas_ind.isExclusao()) {
       avas_indDAO.indicador_remover(avas_ind);
     }else {
       avas_ind.setData_cadastro(Calendar.getInstance());
         avas_indDAO.indicador_avas(avas_ind);
     }

     return avas_ind;

   }

}



/* funcionarios continua


/* captura funcionrios continuas para autorizar aes no AVA */
/*
@RequestMapping("/funciscontinua/{nm_fun}")
public List<Funcionario> FuncisContinua(@PathVariable String nm_fun) {
   return admservice.FuncisContinua(nm_fun);
}

 public List<Funcionario> FuncisContinua(String nm_fun) {
     return fdao.FuncisContinua(nm_fun);
   }

    public List<Funcionario> FuncisContinua(String nm_fun) {

        /* opo para deixar dinamico caso tenha necessidade */
        /*
        int prefixo = 9601;
        nm_fun = nm_fun.toUpperCase();
        System.out.println(" -------------------------------------- " + nm_fun);

        Query q = getSession().createQuery("select f from Funcionario f where f.cd_depe_lclz = :pprefixo and concat(f.nm_fun , ' ', f.matricula) like  :pnm_fun  ");
      q.setParameter("pprefixo", prefixo);
      q.setParameter("pnm_fun", "%"+nm_fun+"%" );

      List<Funcionario> f = q.getResultList();

      return f;

    }


    @Scheduled(fixedDelay = 1000 * 5)
  public void run() throws InterruptedException {
    System.out.println(" fixed rate schendule is runing at " + new Date());
    Thread.sleep(3000);
    funcLogDao.Logfunc(adminController.funcionario, "teste schendule fixed", (long) 100);
  }

  @Scheduled(cron = "* * * * * * ?")
  public void runcron() throws InterruptedException {
    System.out.println(" CRON rate schendule is runing at " + new Date());
    Thread.sleep(3000);
    funcLogDao.Logfunc(adminController.funcionario, "teste schendule cron", (long) 100);
  }

@RequestMapping("/api")
	public void api() {
		   admservice.atualizaapilob();
	 }

   https://take.net/blog/take-test/instalacao-geckodriver-driver-para-abrir-o-firefox-no-selenium/

   unnistall git

// @Scheduled(fixedDelay = 1000 * 5)
	public void run() throws InterruptedException {
		System.out.println(" fixed rate schendule is runing at " + new Date());
	//	Thread.sleep(3000);
	//	funcLogDao.Logfunc(adminController.funcionario, "teste schendule fixed", (long) 100);
	}

	// @Scheduled(cron = "*5 * * * * ?")
	public void runcron() throws InterruptedException {
		System.out.println(" CRON rate schendule is runing at " + new Date());
		Thread.sleep(3000);
	//	funcLogDao.Logfunc(adminController.funcionario, "teste schendule cron", (long) 100);
	//	selenium();
	}


	public void selenium() {
		   System.setProperty("webdriver.gecko.driver", "/Users/alexandreloureiro/desenvolvimento/selenium/geckodriver");


	        // abre firefox
	        WebDriver driver = new FirefoxDriver();

	        // acessa o site do google
	        driver.get("http://www.google.com.br/");

	        // digita no campo com nome "q" do google
	        WebElement campoDeTexto = driver.findElement(By.name("q"));
	        campoDeTexto.sendKeys("Caelum");


     // submete o form
	}

	public void atualizaapilob() {

		System.setProperty("webdriver.gecko.driver", "/Users/alexandreloureiro/desenvolvimento/selenium/geckodriver");

		WebDriver driver = new FirefoxDriver();
        driver.get("http://localhost:4200/#/home/admin/simula");

        WebElement simular =  driver.findElement(By.id("simula"));

        simular.click();

        driver.close();
    }
*/

