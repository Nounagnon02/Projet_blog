import React from "react";

export default function App() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-text-light dark:text-text-dark">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
          <header className="flex items-center justify-between border-b border-solid border-primary/20 dark:border-primary/40 px-4 sm:px-10 lg:px-20 py-4 bg-background-light dark:bg-background-dark">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                import_contacts
              </span>
              <h2 className="text-text-light dark:text-text-dark text-2xl font-bold font-display leading-tight tracking-[-0.015em]">
                Timeless Tales
              </h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#"
                className="text-text-light dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-primary"
              >
                Home
              </a>
              <a
                href="#"
                className="text-text-light dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-primary"
              >
                About the Author
              </a>
              <a
                href="#"
                className="text-text-light dark:text-text-dark text-sm font-medium hover:text-primary dark:hover:text-primary"
              >
                Contact
              </a>
            </nav>
            <button className="md:hidden">
              <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                menu
              </span>
            </button>
          </header>

          {/* Main Content */}
          <div className="px-4 sm:px-10 lg:px-20 flex flex-1 justify-center py-10">
            <div className="layout-content-container flex flex-col lg:flex-row gap-12 max-w-[1200px] flex-1">
              <main className="flex-1">
                {/* Featured Story */}
                <div className="mb-12">
                  <div className="flex flex-wrap justify-between gap-3 p-4">
                    <div className="flex min-w-72 flex-col gap-3">
                      <p className="text-4xl font-black font-display leading-tight">
                        Featured Story
                      </p>
                      <p className="text-text-light/70 dark:text-text-dark/70 text-base">
                        The latest and most significant post
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col items-stretch justify-start rounded-lg xl:flex-row">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                        style={{
                          backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrvZ3CrvAzJTDIiKf3Z9gk2ufmW2JGKPmG_cTC7Aie6j2x2R1TKBtID7aZUvFiNFcPAE_BUYwRmdHjxk_efe5g32s9NS8naQnx4azWoqIAfpfXq2tYMKZrKFbryhlyoDxJfGRelt4Q711yss5pkCMElMih1dAHH0G6iPmwK9TwGeyrwEprqcyBdVTkM1heq4sCNe8iMtTYXL-uM0PsL9tFASCTEp0Evgb9ck17IxrBnCX1ktAo72EoQ10dOE8iYnNT_tCNFqjtFK2z')",
                        }}
                      ></div>
                      <div className="flex w-full min-w-72 grow flex-col justify-center gap-1 py-4 xl:px-4">
                        <p className="text-2xl font-bold font-display">
                          The Secret of the Lighthouse
                        </p>
                        <div className="flex items-end gap-3 justify-between">
                          <div className="flex flex-col gap-1">
                            <p className="text-text-light/70 dark:text-text-dark/70 text-base">
                              For centuries, the old lighthouse stood sentinel
                              over the coast, its beam a beacon of hope...
                            </p>
                            <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                              By Jane Doe - October 26, 2023
                            </p>
                          </div>
                          <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold">
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "A Letter from the Trenches",
                      desc: "A poignant discovery unearths a soldier's last words from the Great War.",
                      author: "By John Smith - October 24, 2023",
                      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwfMQ6FTI312ZUU2EcmBhtPl0feHE1C4IQoKuhZOr732_IVOVS13thhJaXJ3Q0eKUetzCe1rO9bsqoMmB8eh1X3SQQgbIrDdaPHLlr4KG4KjFq47yy7Wvibw1TZtp0dkSK_3-Bld1yF98SQRNdCoDFnZ1JALH4_QmS5f06rH9R3APfDBAjKs9YAGfYEjAyl3GpNvVo5EGg7dIo_EHJq215zAwe0SfZbnzV9alcCdT3kTfENibS3_asosZUoYUJaWHnHAfLNZCQREd4",
                    },
                    {
                      title: "The Fall of a Roman Villa",
                      desc: "Excavations reveal the dramatic final days of a wealthy family during the fall of Rome.",
                      author: "By Dr. Alistair Finch - October 22, 2023",
                      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsHONuAoYGl0LwWn_atytdOo3Wx4ByNQOiC8MYYpfcQtxrxm0NRBUxjBvCeTeKybU4ZJ4TpjK42_yTBiOBRmaqEHMbkUWRA4_TxSusT-lvAoVZ0jPkxQ7b5mRaWIEuTyP6elW1eCQVk5wvMSzSKyk-Xy14OISHNmst5QxfQTGUZ1NkdwfisnKPutT0baG28BF2X74m6_O328edhvtw_NjN3ugD5BiyX07D84K_GxcR-kFZM8lrxniAti9IVP6eCh87bVgtCYHeiv2E",
                    },
                  ].map((article, index) => (
                    <div
                      key={index}
                      className="p-4 bg-background-light dark:bg-background-dark rounded-lg"
                    >
                      <div className="flex flex-col items-stretch justify-start rounded-lg">
                        <div
                          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
                          style={{ backgroundImage: `url(${article.img})` }}
                        ></div>
                        <div className="flex flex-col justify-center gap-1 py-4">
                          <p className="text-xl font-bold font-display">
                            {article.title}
                          </p>
                          <p className="text-text-light/70 dark:text-text-dark/70 text-base">
                            {article.desc}
                          </p>
                          <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                            {article.author}
                          </p>
                          <a
                            href="#"
                            className="text-primary text-sm font-bold self-start mt-2"
                          >
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </main>

              {/* Sidebar */}
              <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="sticky top-10 space-y-8">
                  {/* Search */}
                  <div className="px-4 py-3">
                    <label className="flex flex-col min-w-40 h-12 w-full">
                      <div className="flex w-full rounded-lg h-full">
                        <div className="text-text-light/70 dark:text-text-dark/70 flex items-center justify-center pl-4 rounded-l-lg bg-sidebar-light dark:bg-sidebar-dark">
                          <span className="material-symbols-outlined">
                            search
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-input flex w-full border-none bg-sidebar-light dark:bg-sidebar-dark h-full placeholder:text-text-light/70 dark:placeholder:text-text-dark/70 px-4 rounded-r-lg focus:outline-none"
                          placeholder="Search stories..."
                        />
                      </div>
                    </label>
                  </div>

                  {/* Categories */}
                  <div className="bg-sidebar-light dark:bg-sidebar-dark p-6 rounded-lg">
                    <h3 className="text-lg font-bold font-display mb-4">
                      Categories
                    </h3>
                    <div className="flex flex-col gap-2">
                      {["Ancient History", "Medieval Times", "20th Century", "Personal Anecdotes"].map(
                        (cat, i) => (
                          <a
                            key={i}
                            href="#"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20"
                          >
                            <p className="text-sm font-medium">{cat}</p>
                          </a>
                        )
                      )}
                    </div>
                  </div>

                  {/* Popular Posts */}
                  <div className="bg-sidebar-light dark:bg-sidebar-dark p-6 rounded-lg">
                    <h3 className="text-lg font-bold font-display mb-4">
                      Popular Posts
                    </h3>
                    <div className="flex flex-col gap-3">
                      {[
                        "The Secret of the Lighthouse",
                        "A Letter from the Trenches",
                        "The Fall of a Roman Villa",
                      ].map((post, i) => (
                        <a
                          key={i}
                          href="#"
                          className="text-sm border-b border-text-light/10 dark:border-text-dark/10 pb-2 hover:text-primary dark:hover:text-primary"
                        >
                          {post}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-sidebar-light dark:bg-sidebar-dark mt-12 py-8 px-4 sm:px-10 lg:px-20">
            <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
              <p className="text-sm text-text-light/70 dark:text-text-dark/70">
                © 2023 Timeless Tales. All Rights Reserved.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-text-light/70 dark:text-text-dark/70 hover:text-primary"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
