<template>
  <div style="width: 100%">
    <div class="container">
      <div class="content">
        <div class="drop">
          <div class="contentBox">
            <h2>Sign in</h2>
            <form>
              <div class="inputBox">
                <input type="text" placeholder="Username" />
              </div>
              <div class="inputBox">
                <input type="password" placeholder="Password" />
              </div>
              <div class="inputBox">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
        <div class="btns">
          <span>Forget</span>
          <span>Password</span>
        </div>
        <div class="btns signup">Signup</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eff0f4;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .drop {
      width: 350px;
      height: 350px;
      box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05), 25px 35px 20px rgba(0, 0, 0, 0.05),
        25px 30px 30px rgba(0, 0, 0, 0.05), inset -20px -20px 25px rgba(255, 255, 255, 0.9);
      transition: 0.5s;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 52% 48% 33% 67% / 38% 45% 55% 62%;
      position: relative;

      .contentBox {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 40px;
        gap: 15px;

        h2 {
          color: #333;
          gap: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;

          .inputBox {
            width: 225px;
            box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1), inset -2px -5px 10px rgba(255, 255, 255, 1),
              15px 15px 10px rgba(0, 0, 0, 0.05), 15px 10px 15px rgba(0, 0, 0, 0.025);
            border-radius: 25px;
            position: relative;

            input {
              border: none;
              outline: none;
              background-color: transparent;
              width: 100%;
              font-size: 1em;
              padding: 10px 15px;
            }

            &::before {
              content: '';
              position: absolute;
              top: 8px;
              left: 50%;
              transform: translateX(-50%);
              width: 65%;
              height: 5px;
              background-color: rgba(255, 255, 255, 0.5);
              border-radius: 5px;
            }

            &:last-child {
              transition: 0.6s;
              width: 120px;
              background-color: #ff0f5b;
              box-shadow: inset 2px 5px 10px rgba(0, 0, 0, 0.1), 15px 15px 10px rgba(0, 0, 0, 0.05),
                15px 10px 15px rgba(0, 0, 0, 0.025);

              input {
                color: #fff;
                text-transform: uppercase;
                font-size: 1em;
                cursor: pointer;
                letter-spacing: 0.1em;
                font-weight: 500;
              }

              &:hover {
                width: 150px;
              }
            }
          }
        }
      }

      &:hover {
        border-radius: 50%;
      }

      &::before {
        content: '';
        position: absolute;
        top: 50px;
        left: 85px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.9;
      }

      &::after {
        content: '';
        position: absolute;
        top: 90px;
        left: 110px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.9;
      }
    }

    .btns {
      position: absolute;
      right: -120px;
      bottom: 0;
      width: 120px;
      height: 120px;
      background-color: #c61dff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      cursor: pointer;
      text-decoration: none;
      color: #fff;
      line-height: 1.2em;
      letter-spacing: 0.1em;
      font-size: 0.8em;
      transition: 0.25s;
      text-align: center;
      box-shadow: inset 10px 10px 10px rgba(190, 1, 254, 0.05), 25px 35px 20px rgba(190, 1, 254, 0.1),
        25px 30px 30px rgba(190, 1, 254, 0.1), inset -10px -10px 15px rgba(255, 255, 255, 0.5);
      border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%;
      user-select: none;

      &:hover {
        border-radius: 50%;
      }

      &::before {
        content: '';
        position: absolute;
        top: 15px;
        left: 30px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #fff;
        opacity: 0.45;
      }
    }

    .signup {
      bottom: 150px;
      right: -120px;
      width: 80px;
      height: 80px;
      border-radius: 49% 51% 52% 48%/ 63% 59% 41% 37%;
      background-color: #01b4ff;
      box-shadow: inset 10px 10px 10px rgba(1, 180, 255, 0.05), 25px 35px 20px rgba(1, 180, 255, 0.1),
        25px 30px 30px rgba(1, 180, 255, 0.1), inset -10px -10px 15px rgba(255, 255, 255, 0.5);

      &::before {
        left: 20px;
        width: 15xpx;
        height: 15px;
      }
    }
  }
}
</style>
